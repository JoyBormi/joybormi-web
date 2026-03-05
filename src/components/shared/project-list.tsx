"use client"

import Image from "next/image"
import React, { useCallback, useEffect, useState } from "react"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { StreamContext } from "@/types/chat.types"
import { LocationIcon } from "../icons"

const ArrowIcon: React.FC<{ className?: string; direction: "left" | "right" }> = ({ className, direction }) => (
  <svg
    className={cn(className, direction === "left" ? "rotate-180" : "")}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.5 3L10.5 8L5.5 13"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ProjectCard: React.FC<{ project: StreamContext }> = ({ project }) => {
  const fallbackImage = "/images/kimes.png"
  const [imageSrc, setImageSrc] = useState(project.image_url || fallbackImage)

  useEffect(() => {
    setImageSrc(project.image_url || fallbackImage)
  }, [project.image_url])

  const handleDetailsClick = useCallback((project: StreamContext) => {
    if (project.type === "product") {
      window.open(`https://www.kimes.kr/${project.lang}/visitor/product-search?q=${project.name}`, "_blank")
    } else {
      window.open(`https://www.kimes.kr/${project.lang}/exhibitor/detail/${project.external_id}`, "_blank")
    }
  }, [])

  return (
    <article className="bg-navy-300 shadow-1 flex h-full flex-col rounded-sm p-3">
      <figure className="relative flex h-40 items-center justify-center overflow-hidden rounded-sm bg-white">
        <Image
          src={imageSrc}
          alt={(project.name || project.company_name) ?? "Product Image"}
          fill
          sizes="(max-width: 480px) 90vw, (max-width: 768px) 45vw, 260px"
          className="object-contain p-2"
          onError={() => {
            if (imageSrc !== fallbackImage) {
              setImageSrc(fallbackImage)
            }
          }}
        />
      </figure>
      <div className="mt-3 inline-flex items-center gap-1">
        <div className="inline-flex w-fit items-center gap-1 rounded-xs bg-red-300 py-[3px] pr-[6px] pl-1 text-red-200">
          <LocationIcon className="size-[14px] fill-red-200" />
          <span className="caption-2 text-red-200">{project.booth_number}</span>
        </div>

        {project.company_name && <p className="caption-1 line-clamp-1 truncate text-black">{project.company_name}</p>}
      </div>

      {project.name && <p className="subtitle text-navy-500 mt-1 mb-3 line-clamp-2">{project.name}</p>}

      <button
        type="button"
        className="caption-1 bg-navy-500 mt-auto h-10 rounded-sm py-2.5 text-white"
        onClick={() => handleDetailsClick(project)}
      >
        자세히 보기
      </button>
    </article>
  )
}

const ProjectCarousel: React.FC<{ projects: StreamContext[]; type?: "product" | "company" }> = ({ projects, type }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollState = useCallback((carouselApi?: CarouselApi) => {
    if (!carouselApi) return
    setCanScrollPrev(carouselApi.canScrollPrev())
    setCanScrollNext(carouselApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!api) return

    updateScrollState(api)
    api.on("select", updateScrollState)
    api.on("reInit", updateScrollState)

    return () => {
      api.off("select", updateScrollState)
      api.off("reInit", updateScrollState)
    }
  }, [api, updateScrollState])

  const openListingPage = useCallback(
    (lang: "en" | "ko") => {
      const targetUrl =
        type === "company"
          ? `https://www.kimes.kr/${lang}/visitor/exhibitor-search`
          : `https://www.kimes.kr/${lang}/visitor/product-search`
      window.open(targetUrl, "_blank")
    },
    [type]
  )

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ align: "start", dragFree: true, containScroll: "trimSnaps" }}>
        <CarouselContent className="-ml-2.5">
          {projects.map((project, idx) => (
            <CarouselItem key={idx} className="basis-[75%] pl-2.5 sm:basis-[52%]">
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
          <CarouselItem className="basis-[28%] pl-2.5 sm:basis-[20%] md:basis-[18%] lg:basis-[14%]">
            <div className="flex h-full items-center justify-center">
              <button
                type="button"
                aria-label="Open all projects"
                onClick={() => openListingPage(projects?.find((p) => p.lang === "en")?.lang || "ko")}
                className="bg-navy-500 flex aspect-square size-11 items-center justify-center rounded-full text-white shadow-md"
              >
                <ArrowIcon direction="right" className="scale-125" />
              </button>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {canScrollPrev && (
        <button
          type="button"
          aria-label="Scroll previous projects"
          onClick={() => api?.scrollPrev()}
          className="bg-navy-500 absolute top-1/2 left-2 z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-md"
        >
          <ArrowIcon direction="left" />
        </button>
      )}
      {canScrollNext && (
        <button
          type="button"
          aria-label="Scroll next projects"
          onClick={() => api?.scrollNext()}
          className="bg-navy-500 absolute top-1/2 right-2 z-10 flex size-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-md"
        >
          <ArrowIcon direction="right" />
        </button>
      )}
    </div>
  )
}

const ProjectList: React.FC<{ recommended_catalogs: StreamContext[] }> = ({ recommended_catalogs }) => {
  return (
    <div className={cn("mt-3 flex w-full flex-col gap-8")}>
      <section className="flex flex-col gap-2">
        <ProjectCarousel projects={recommended_catalogs} />
      </section>
    </div>
  )
}

export { ProjectList }
