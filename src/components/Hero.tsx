// components/Hero.tsx

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import React Icons
import ProfilePic from "@/assets/main photo.jpg"

export default function Hero() {
  return (
    <section className="pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="container mx-auto px-4">
      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            Christian Coulibaly
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Software Engineering student with a passion for computing and developing fun and exciting solutions to new problems.
          </p>
          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Button size="lg">See Projects</Button>
            <Button variant="outline" size="lg">
              Contact me
            </Button>
          </div>
          {/* Reviews */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Review 1 */}
            <div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-4 w-4 text-yellow-500" />
                ))}
              </div>
              <p className="mt-2 text-sm">
                <span className="font-bold">4.6</span> /5 - from 12k reviews
              </p>
              {/* Company Logo */}
              <div className="mt-4">
                {/* Replace with actual logo */}
                <img src="" alt="Company Logo 1" className="h-8" />
              </div>
            </div>
            {/* Review 2 */}
            <div>
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="h-4 w-4 text-yellow-500" />
                ))}
                <FaStarHalfAlt className="h-4 w-4 text-yellow-500" />
              </div>
              <p className="mt-2 text-sm">
                <span className="font-bold">4.8</span> /5 - from 5k reviews
              </p>
              {/* Company Logo */}
              <div className="mt-4">
                {/* Replace with actual logo */}
                <img src="" alt="Company Logo 2" className="h-8" />
              </div>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="relative">
          <Image
            className="w-full rounded-md"
            src={ProfilePic}
            alt="Image Description"
            width={800}
            height={700}
          />
        </div>
      </div>
      </div>
    </section>
  );
}
