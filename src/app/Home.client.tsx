"use client"

import Hero from "@/components/Home/Hero";
import { TechnologyParallax } from "@/components/Home/TechnologyParallax";

import { ParallaxSection } from "@/components/Home/ParallaxSection";
import { Section } from "lucide-react";
import { Partners } from "@/components/Home/Partners";


export default function Home() {


    return (

    <>
      <section>
        <Hero/>
      </section>
      <section>
        <TechnologyParallax/>
      </section>
        <section>   
        <ParallaxSection/>
        </section>  
        <section>
            <Partners/>
        </section>

 

    </>

  );
};



