"use client"
import { NapiMiddleware } from 'next/dist/build/swc/generated-native'
import { useState } from 'react'

interface ImageCarouselProps {
    images: string[]
    systemName: string
}

function ImageCarousel({ images, systemName }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    function handleLeft() {
        if ((currentIndex - 1) < 0) {
            setCurrentIndex(images.length - 1)
        } else {
            setCurrentIndex(currentIndex - 1)
        }
    }
    function handleRight() {
        if ((currentIndex + 1) >= images.length) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1)
        }
    }
    if (images.length === 0) {
        return (
            <div>

            </div>
        )
    }
    return (
        <div>
            <img src={images[currentIndex]} alt={systemName + " Image " + (currentIndex + 1)} />
            <div>
                <button onClick={handleLeft}>←</button>
                <div>
                    {images.map((_, index) => (
                        <button key={index} onClick={() => setCurrentIndex(index)}>
                        </button>
                    ))}
                </div>

                <button onClick={handleRight}>→</button>
            </div>
        </div>
    )
}

export default ImageCarousel