'use server'

import { createClient } from '@/utils/supabase/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function generateImage(prompt: string, userId: string) {
  try {
    // 創建預測
    const prediction = await replicate.predictions.create({
      version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      input: {
        prompt: prompt,
        negative_prompt: "ugly, blurry, poor quality, distorted",
        width: 768,
        height: 768,
        num_outputs: 1,
        scheduler: "K_EULER",
        num_inference_steps: 50,
        guidance_scale: 7.5,
      }
    })

    // 等待預測完成
    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000)
      const updatedPrediction = await replicate.predictions.get(prediction.id)
      if (updatedPrediction.error) {
        throw new Error(updatedPrediction.error.toString())
      }
      Object.assign(prediction, updatedPrediction)
    }

    if (prediction.status === "failed") {
      throw new Error('圖片生成失敗')
    }

    if (!prediction.output || !Array.isArray(prediction.output) || prediction.output.length === 0) {
      throw new Error('圖片生成失敗')
    }

    const imageUrl = prediction.output[0]

    const supabase = await createClient()
    const { error } = await supabase
      .from('images')
      .insert([
        {
          user_id: userId,
          url: imageUrl,
          prompt: prompt,
        },
      ])

    if (error) throw error

    return imageUrl
  } catch (error) {
    console.error('Error generating image:', error)
    throw new Error('圖片生成失敗')
  }
}

export async function getImages(userId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching images:', error)
    throw new Error('獲取圖片失敗')
  }
}

export async function deleteImage(id: string) {
  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting image:', error)
    throw new Error('刪除圖片失敗')
  }
} 