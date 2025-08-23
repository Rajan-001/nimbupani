"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header } from '../app/components/Header';


const faqData = [
  {
    question: "I’m a big Charlie’s fan, could you tell me why the taste sometimes differs?",
    answare: "It’s amazing you taste the difference! That’s because Charlie uses only fresh fruits from organic farming and never juices from concentrate! And every harvest is different so the fruits can be a little different too. We do nothing to alter the taste, we use ripe fruits as they come in the season. We believe that’s the honest way of getting our drink to you. Think of it as a little reminder that Mother Nature’s in charge (and she’s always delicious)."
  },
  {
    question: "I love Charlie’s, how can I become a brand ambassador?",
    answare: "How lovely that you want to help Charlie’s grow! Please send information about your page, followers, promotion ideas and specific requests to hellocharlie@drinkcharlies.com"
  },
  {
    question: "Can you tell me a bit more about your support to JOGG by signing their accord?",
    answare: "Great initiatives help Charlie’s reach people and planet goals. JOGG’s mission is to create a healthy environment for our young generation. JOGG believes healthy choices in school canteens are important for creating a healthy lifestyle among youngsters. By signing the accord brand owners, suppliers and vending machine companies take the responsibility for bringing healthy alternatives to schools at an affordable price. You can read more if you like on their website: https://jongerenopgezondgewicht.nl/initiatieven/akkoord-gezonde-voeding-op-scholen."
  },
  {
    question: "Can you tell me a bit more about the partnership with Trees For All?",
    answare: "Great partners help Charlie’s reaching people and planet goals. Trees for All’s mission is to counter climate change by offsetting carbon emissions through planting trees and conserving forests. Trees for All projects are VCS and CCB certified, guaranteeing all our CO2 emissions will be offset. You can read more if you like on their website www.treesforall.nl."
  },
  {
    question: "Does Charlie's contain calories and sugars?",
    answare: "We have no sugar! and close to zero calories. Because we are using a squeeze of real organic fruit there will always be a tiny little bit of sugar that comes with the juice itself, but because it is a negligible amount we don’t even have to declare it on the labels. We love to be transparent and we love to proudly say we only have three ingredients: water, organic fruit juice and organic suitable aroma’s. That means no sneaky ingredients, no fake stuff, and definitely no sugar highs (or crashes)."
  },
  {
    question: "I have the best new flavour idea, where can I share it?",
    answare: "We LOVE to hear from our fans, please share your fantastic flavour idea via hellocharlie@drinkcharlies.com or use our contact form on this website."
  },
  {
    question: "Which flavours do you currently have?",
    answare: "Enough to choose from, six delicious thirst-quenching flavours: Lemon, Grapefruit, Orange-Mandarin, Passionfruit, Black Currant, Raspberry-Lime. We are always working on bringing the next new flavour to you, so keep an eye on our socials ;)"
  },
  {
    question: "Why are cans better than plastic?",
    answare: "Cans are infinitely recyclable, without loss of quality, unlike plastics. Cans are made of aluminium and have the highest material recycling rate in the world! And because it’s already here, it’s called a permanent material, the basis for a circular economy."
  },
  {
    question: "What do you mean by 'harmless hydration'?",
    answare: "Glad you asked! Harmless hydration means doing good for you and the planet. For you, it means healthy drinks with no added sugars, no sweeteners and no weird artificials. For the planet, it means using organic ingredients, endlessly recyclable cans, and a commitment to do what we can to achieve a CO2-neutral production chain. Currently we offset our carbon emissions by supporting Trees for All. It’s hydration that doesn’t harm your body nor the Earth. So go ahead and sip guilt-free. Let’s drink harmless!"
  },
  {
    question: "Is Charlie's a water or a soft drink?",
    answare: "Charlie's is what happens when water gets a glow-up and soft drinks lose their bad habits 😉 We’re sparkling water with a squeeze of organic fruit, so you get all the taste and fun of a soft drink, without the sugar, artificials, or guilt."
  },
  {
    question: "What’s the difference between real squeezed fruit and juice from concentrate?",
    answare: "Real squeezed fruit is what Charlie believes in to be just perfect. Fruit juice as fruit juice should be, untouched! Fruit concentrate or juice from concentrate is basically fruit with the water removed to reduce volume, resulting in losing the fibres and vitamin C, but keeping the sugars and calories. It also changes the flavour as the juice is processed and treated. This doesn’t sound like real juice to us."
  },
  {
    question: "Where can I buy Charlie's?",
    answare: "Everywhere cool, basically. You can find Charlie’s sparkling goodness online (because who doesn’t love shopping in their pyjamas?) and offline at your favourite spots. Please see our store locator section here."
  },
  {
    question: "Why don’t you like sweeteners?",
    answare: "Charlie knows you want to make conscious choices and sometimes it’s hard to know what’s good and what’s not. The word harmless makes it easy. Harmless is also a way to inspire the drinks industry to do good for both people and planet. Some drinks are already harmless, like tap-water. But that’s not always around and drinking liters of tap water every day can get boring. So Charlie’s created the harmless alternative. A few other drinks are already well on the way to reaching the harmless standard. You can find them on this Harmless-o-meter that Charlie’s created. Want to see it? Just drop a line to hellocharlie@drinkcharlies.com"
  }
];


export const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  function toggleFaq(index:any){
    console.log(index)
   setOpenIndexes((prev)=>prev.includes(index)?prev.filter((i)=>i!=index):[...prev,index])
  }

  return (
    <div className='bg-yellow-50'>
    <div className="w-screen px-2 py-8 max-w-5xl mx-auto ">
      <Header text="faq"/>
      <div className="space-y-4 h-fit mx-4 bg-white mt-16 [clip-path:polygon(4%_0,100%_0,98%_100%,0%_100%)] pt-2 pb-2">
       {
        faqData.map((item,index)=>{
        
            return<div key={index} className='mt-4 px-4 py-2 '>
             <div onClick={()=>toggleFaq(index)} className={`text-blue-900 mx-2 cursor-pointer flex px-16 py-2 justify-start [clip-path:polygon(5%_0%,100%_0%,96%_100%,2%_96%)] items-center font-bold h-fit whitespace-nowrap w-full  text-start uppercase  ${openIndexes.includes(index)?"bg-sky-200 ":""}`}>
              {
                item.question
              }
             </div>
         
                {
                    openIndexes.includes(index)&&
                    <p className="mt-2 text-base px-16 font-normal text-blue-900">{item.answare}</p>
                }
            

            </div>
        })
       }
      </div>
    </div>
    </div>
  );
};