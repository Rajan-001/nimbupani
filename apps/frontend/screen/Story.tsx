"use client"

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import React,{useRef} from 'react'
import Image from 'next/image'
import { Button } from '../app/components/Button'
import { useRouter } from 'next/navigation'

export const Story = () => {
    const container=useRef(null)
    const story=useRef(null)
  const ImageStory=useRef(null)
  const router=useRouter()

 const {scrollYProgress}=useScroll({
    target:container,
    offset: ["start end", "end start"],
 })
 const leftoffset=useTransform(scrollYProgress,[0,1],[-150,300])

  const {scrollYProgress: storyScrollYProgress}=useScroll({
    target:story,
    offset: ["start end", "end start"],
 })

 const storyWidth = useTransform(storyScrollYProgress, [0, 0.1], ['75vw', '100vw'])
const storyHeight = useTransform(storyScrollYProgress, [0, 0.1], ['75vh', '100vh'])
const textvisibility=useTransform(storyScrollYProgress,[0.1,0.2],["150%","0%"])
 const scaleImage = useTransform(storyScrollYProgress, [0.2, 0.3], [0, 1])
 const rotateImage= useTransform(storyScrollYProgress, [0.2, 0.3], ["0deg", "30deg"])
const scalediv=useTransform(storyScrollYProgress, [0.3, 0.37,0.4,0.46,0.52], [0, 40,40,40,0])

const secondstoryHeight=useTransform(storyScrollYProgress, [0.34, 0.35], ['0vh', '100vh'])
const seondstoryWidth=useTransform(storyScrollYProgress, [0.34, 0.35], ['0vw', '100vw'])
const secondtextvisibility=useTransform(storyScrollYProgress,[0.4,0.45],["150%","0%"])
 const secondscaleImage = useTransform(storyScrollYProgress, [0.4, 0.45], [0, 1])
 
 const {scrollYProgress: ImageScrollYProgress}=useScroll({
    target:ImageStory,
    offset: ["start end", "end start"],
 })

 const scrollImage=useTransform(ImageScrollYProgress,[0.2,0.8],[-500,50])


return (
   <div >
     
    <div ref={container} className='w-full h-[180vh] relative'>
       <svg className='my-12 bg-amber-100' xmlns="http://www.w3.org/2000/svg" version="1.1"   viewBox="0 0 920 100">
       <motion.path
       id="lineAC"
   d="M2,80 C200,65 650,65 920,60" fill="none" strokeWidth="25" strokeLinecap="round"></motion.path>
   <text fill="black" fontSize="20">
          <motion.textPath
            href="#lineAC"
            startOffset={leftoffset}
            className="text-5xl"
          >
             CASSIS 🍇 PASSIONFRUIT 🥭 ORANGE & MANDARIN 🍊 RASPBERRY 🍓 LIME 🍋
          </motion.textPath>
          </text>
    </svg>
    <div ref={story} className='w-screen h-[200vh]  overflow-hidden  flex relative place-content-center'>
   <motion.div  style={{width:storyWidth,height:storyHeight}} className=' bg-yellow-200 text-blue-900 absolute origin-center top-2 left-1/2 -translate-x-1/2 -translate-y-2  flex justify-center items-center h-screen  '>
  <motion.div className='w-[75vw] text-center h-[50vh] grid grid-rows-6'>
   <motion.div className='overflow-hidden text-4xl flex justify-center items-center'><motion.div style={{y:textvisibility}}> The product</motion.div> </motion.div> 
   <motion.div className='overflow-hidden text-3xl flex justify-center items-center'><motion.div style={{y:textvisibility}}>Well then, what's not in the can? </motion.div></motion.div>
   <motion.div className='overflow-hidden text-3xl flex justify-center items-center'><motion.div style={{y:textvisibility}}>No added sugars, no sweeteners</motion.div></motion.div>
   <motion.div className='overflow-hidden text-3xl flex justify-center items-center'><motion.div style={{y:textvisibility}}>No colourants, no preservatives, no concentrates. </motion.div></motion.div>
   <motion.div className='overflow-hidden text-3xl flex justify-center items-center'><motion.div style={{y:textvisibility}}>Funny we even mention it, no?</motion.div></motion.div>
</motion.div>
   <motion.div style={{scale:scaleImage,rotate:rotateImage}} className='absolute bottom-18 right-24'>
            <Image unoptimized src={"/images/cut-fruit.avif"} height={20} width={30} className='h-72 w-72 z-4 ' alt='Image'/>
         </motion.div>
           <AnimatePresence>
            <motion.div style={{scale:scalediv}} className='absolute bg-blue-950 bottom-42 right-52 w-24 h-24 rounded-full'>

            </motion.div>
           </AnimatePresence>
   </motion.div>

    <motion.div  style={{width:seondstoryWidth,height:secondstoryHeight}} className='origin-center bg-blue-950 absolute top-1/4 text-slate-50 flex justify-center items-center h-screen '>
  <motion.div className='w-[75vw] text-center h-[50vh] grid grid-rows-6'>
   <motion.div className='overflow-hidden text-4xl flex justify-center items-center'><motion.div style={{y:secondtextvisibility}}> MISSON</motion.div> </motion.div> 
   <motion.div className='overflow-hidden text-3xl flex justify-center items-center'><motion.div style={{y:secondtextvisibility}}>So this is the way you can stay hydrated </motion.div></motion.div>
   <motion.div className='overflow-hidden text-3xl flex justify-center items-center'><motion.div style={{y:secondtextvisibility}}>Healthily, all day, every day – feeling good</motion.div></motion.div>
   <motion.div className='overflow-hidden text-3xl flex justify-center items-center'><motion.div style={{y:secondtextvisibility}}>and doing good. At work, on the go</motion.div></motion.div>
   <motion.div className='overflow-hidden text-3xl flex justify-center items-center'><motion.div style={{y:secondtextvisibility}}>studying, or out for a walk.</motion.div></motion.div>
</motion.div>
   <motion.div style={{scale:secondscaleImage}} className='z-2 absolute bottom-18 right-24'>
            <Image unoptimized src={"/svg/letsdrinkharmless.svg"} height={20} width={30} className='h-72 w-72' alt='Image'/>
         </motion.div>
          
   </motion.div>
   
</div>
    </div>
   

    <div className="w-screen h-screen relative">
         <div className='w-full h-[70vh]    grid grid-cols-2  '>
         <div className='px-12 w-full  h-full   '>
            <div className='text-3xl pl-4 mt-8 font-bold'>
             <Image className='inline-block h-12 w-12 -ml-14' src={"/svg/drip.svg"} width={40} height={40} alt="Charlie"/>  Meet Charlie
            </div>
            <div className='text-3xl mt-12 leading-12 text-blue-950 font-semibold'>
               Charlie cares for healthy people on a healthy planet. Inspiring others to do the same. Transparent about what we’re already doing and about what’s on the bucket list.
            </div>
           <Image className='inline h-2 w-36 absolute left-34 ' src={"/svg/underline.svg"} width={40} height={40} alt="Charlie"/> 
            <div className='mt-16  ' onClick={()=>router.push("/order")}>
            <Button  buttonText={'Order Now'}/>
            </div>
         </div>
      <div className='w-full h-full flex justify-center items-center'>
      <div className=' w-full h-full ' 
      style={{
        maskImage: 'url("/svg/leaf.svg")', // Prefer SVG/PNG
            WebkitMaskImage: 'url("/svg/leaf.svg")',
            maskSize: "100%",
            WebkitMaskSize: "100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat"
           
      }}
         >
      <Image unoptimized width={35} height={23} alt="Imaflksd" src="/images/BucketDrink.jpeg" className=" object-cover w-full h-[90vh]" />
      </div>
      </div>
   </div>
    </div>

    <div className='w-screen    '>
      <div className=' w-screen bg-lime-200  flex flex-row '>
         <div className='w-1/2  sticky top-0 h-screen flex flex-col justify-center items-start p-8'>
         <Button buttonText={'WHAT THE PLANET'}/>
         <div className='w-full  text-4xl leading-18 py-12 px-26 font-bold text-blue-950 '> 
          Charlie wants her to stay pretty as well
         </div>
         </div>

         <div  className=' w-1/2 min-h-[250vh] '>
            <div className='grid grid-rows-3  justify-center items-center gap-5 text-center w-full h-full'>
            <div className=' bg-lime-100 h-full  w-full'>
               <div className='w-full h-56 flex justify-center items-center '>
               <Image src={"/svg/Charlie-organic.svg"} className='w-52 h-full object-cover' width={30}  height={90} alt='Charlie Organic' />
               </div>
               <div className=''><h1 className='text-5xl uppercase  px-4 font-bold text-blue-950'>Yes we can. Can!</h1>
                  <div className='text-3xl my-6 px-4 leading-12 font-medium text-blue-900'>Cans, crafted from permanent aluminum, offer unique recycling advantages. Unlike plastic bottles, cans can be recycled endlessly, boasting the world’….

                  </div>
                  </div>
             </div>

            <div className='bg-lime-100  h-full w-full'>
               <div className='w-full h-56 flex justify-center items-center '>
               <Image src={"/svg/co2-neutral.svg"} className='w-52 h-full object-cover' width={30}  height={90} alt='Charlie Organic' />
               </div>
               <div className=''><h1 className='text-5xl uppercase px-4 font-bold text-blue-950'>ORGANIC FRUITS</h1>
                  <div className='text-3xl my-6 px-4 leading-12 font-medium text-blue-900'>Organic farming reduces pollution, erosion, and energy use, yet improves soil, health for insects and birds, conserving water on the way. We know it’s a lot so we tried to keep!
             
                  </div>
                  </div>
             </div>

              <div className=' bg-lime-100  h-full w-full'>
               <div className='w-full h-56 flex justify-center items-center '>
               <Image src={"/svg/bio-organic.svg"} className='w-52 h-full object-cover' width={30}  height={90} alt='Charlie Organic' />
               </div>
               <div className=''><h1 className='text-5xl uppercase px-4 font-bold text-blue-950'>Yes we can. Can!</h1>
                  <div className='text-3xl my-6 px-4 leading-12 font-medium text-blue-900'> Cans, crafted from permanent aluminum, offer unique recycling advantages. Unlike plastic bottles, cans can be recycled endlessly, boasting the world’….
             
                  </div>
                  </div>
             </div>

            </div>


         </div>
      </div>
     </div>


     <div className='flex justify-between  my-18 px-18'>
    <div className='text-5xl font-extrabold text-blue-950'>SOCIALS</div>
    <div className='text-4xl font-bold text-blue-950'>Instagram Tiktok</div>
    </div>

    <div  className='w-screen h-screen relative  overflow-hidden'>
     <motion.div ref={ImageStory} style={{right:scrollImage}} className='absolute grid gap-6 grid-cols-3  w-[140vw] h-full'>
      <div className='rounded-3xl'>
         <Image className='h-full w-full rounded-4xl' unoptimized width={30} height={40} src='/images/BucketDrink.jpeg' alt={'Bucket'} />
      </div>
      <div>
         <Image className='h-full w-full rounded-4xl' unoptimized width={30} height={40} src='/images/flower-with-farm.avif' alt={'Bucket'} />
      </div>
       <div>
         <Image className='h-full w-full rounded-4xl' unoptimized width={30} height={40} src='/images/Orange-Drink.avif' alt={'Bucket'} />
      </div>
     </motion.div>
    </div>
    

    
    </div>
  )
}