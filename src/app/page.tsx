"use client"

import { useEffect, useState } from "react"
import AboutMe from "./sections/about-me"

interface Section {
  id: string
  title: string
  component?: React.FC
}

const sections: Record<string, Section> = {
  section1: { id: "section1", title: "Section 1", component: AboutMe },
  section2: { id: "section2", title: "Section 2" },
  section3: { id: "section3", title: "Section 3" },
  section4: { id: "section4", title: "Section 4" },
}

export default function Home() {
  let isScrolling = false
  const [currentSection, setCurrentSection] = useState<Section>(sections[0])

  useEffect(() => {
    const scroll = (direction: "up" | "down") => {
      if (isScrolling) return

      isScrolling = true

      const currentSection = document
        .elementFromPoint(0, window.innerHeight / 2)
        ?.closest(".full-screen-section")

      const nextSection =
        direction === "down"
          ? currentSection?.nextElementSibling
          : currentSection?.previousElementSibling

      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth", block: "start" })
        setCurrentSection(sections[nextSection.id])
      }

      setTimeout(() => {
        isScrolling = false
      }, 1000)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      scroll(e.deltaY > 0 ? "down" : "up")
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  })

  return (
    <div className="App">
      {Object.values(sections).map((section) => (
        <section
          key={section.id}
          className="full-screen-section"
          id={section.id}
        >
          {section.component ? <section.component /> : <h1>{section.title}</h1>}
        </section>
      ))}
    </div>
  )
}
