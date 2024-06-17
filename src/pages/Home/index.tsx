import AppLayout from 'components/AppLayout';
import BoxReveal from 'components/MagicUI/BoxRevealText';
import AnimatedGridPattern from 'components/MagicUI/RetroGrid';
import { cn } from 'lib/utils';
import React from 'react';
import { Link } from 'react-router-dom';
import colors from 'styles/colors';

const companyLogos = [
  'https://static.vecteezy.com/system/resources/thumbnails/027/971/388/small_2x/3d-render-round-warm-orange-fire-flame-icon-realistic-hot-sparks-light-gas-logo-design-for-emoticon-energy-power-ui-png.png',
  'https://i.pinimg.com/originals/32/ce/5a/32ce5ae0555afc83f66cbc13e52e68c9.png',
  'https://upload.wikimedia.org/wikipedia/commons/1/14/FRONT3X-Logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/d/db/Zeronet_logo.png',
  'https://images.vexels.com/content/224138/preview/abstract-wavy-violet-logo-2321b7.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/2023_Ita%C3%BA_Unibanco_Logo.png/1200px-2023_Ita%C3%BA_Unibanco_Logo.png',
];

const features = [
  {
    title: 'User using platform',
    value: '200K+',
  },
  {
    title: 'Growth Rate',
    value: '98%',
  },
  {
    title: 'Cooperating Companies',
    value: '150+',
  },
  {
    title: 'User using platform',
    value: '200K',
  },
  {
    title: 'Data Served',
    value: '10pb',
  },
];

const Home = () => {
  return (
    <AppLayout>
      <div className="pt-16 xs:h-screen md:h-[90vh] shadow-xl bg-gradient-to-br from-accent/50 to-primary/80 dark:from-accent/50 dark:to-primary/50 overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={cn(
            '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[30%] h-[50%] skew-y-12',
          )}
        />
        <div className="grid grid-cols-12 h-full gap-4">
          <div className="xs:col-span-12 md:col-span-6 h-full flex items-center justify-center">
            <div className="p-6 z-[150] ">
              <BoxReveal boxColor={colors.primary} duration={0.5}>
                <h1 className="w-[14ch] xs:text-3xl md:text-5xl font-Manrope font-bold text-white">
                  Super charge your meetings and
                  <br /> made it effective
                </h1>
              </BoxReveal>
              <BoxReveal boxColor={colors.primary} duration={0.6}>
                <p className="text-gray-600 dark:text-gray-500 xs:w-[35ch] md:w-[44ch] mt-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque ab
                  possimus dolore de perferendis.
                </p>
              </BoxReveal>

              <BoxReveal boxColor={colors.primary} duration={0.7}>
                <Link to="/login">
                  <button className="px-8 py-2 rounded-full bg-primary text-white text-lg mt-8">
                    Start Meeting Now
                  </button>
                </Link>
              </BoxReveal>
            </div>
          </div>
          <div className="xs:col-span-12 md:col-span-6 flex items-center justify-center h-full">
            <BoxReveal boxColor={colors.primary} duration={0.5}>
              <img
                src="infographics/landing.svg"
                className="xs:w-4/5 xs:h-auto md:h-4/6 md:w-auto drop-shadow-xl mx-auto"
                alt=""
              />
            </BoxReveal>
          </div>
        </div>
      </div>
      <div className=" bg-gray-100 dark:bg-gray-900 xs:px-6 py-24 px-10">
        <h2 className="text-center text-xl md:text-4xl font-Manrope font-medium">
          Used by proffessionals on
        </h2>
        <div className="lg:container mx-auto flex items-center xs:justify-center md:justify-between gap-4 mt-10 pb-16 xs:flex-wrap md:flex-nowrap">
          {companyLogos.map((url: string) => (
            <img src={url} alt="" className="h-10 md:h-16 grayscale" key={url} />
          ))}
        </div>
        <div className="lg:container mx-auto flex items-center xs:justify-center md:justify-between gap-4 pt-16 xs:flex-wrap md:flex-nowrap">
          {features.map((feat) => (
            <div key={feat.title} className="text-center xs:p-4 md:p-0">
              <span className="xs:text-3xl md:text-5xl font-bold dark:text-white font-Manrope">
                {feat.value}
              </span>
              <p className="text-sm text-gray-500 mt-1">{feat.title}</p>
            </div>
          ))}
        </div>
      </div>
      <section className="bg-white dark:bg-gray-950 px-6 py-20 flex items-center justify-center text-black">
        <div className="lg:container mx-auto grid grid-cols-12 gap-4 w-screen">
          <div className="xs:col-span-12 md:col-span-6 flex items-center">
            <div>
              <h2 className="xs:text-3xl md:text-5xl mt-10 font-Manrope dark:text-white w-[13ch]">
                Flexible solution for all your needs
              </h2>
              <p className="text-gray-500 w-[50ch] mt-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non harum eum
                voluptates, deserunt omnis ipsa molestiae libero, esse reiciendis eius
                sequi nobis saepe amet. Aperiam, facilis! Voluptatibus cupiditate
                dignissimos nulla?
              </p>
            </div>
          </div>
          <div className="xs:col-span-12 md:col-span-6">
            <img
              src="meeting.jpg"
              className="w-4/5 mx-auto rounded-xl shadow-xl"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="bg-primary text-center p-6 ">
        <h2 className="xs:text-3xl md:text-5xl mt-10 font-Manrope text-white">
          You&apos;ve got this far <br /> Ready to get started your <br /> important
          meeting?
        </h2>
        <div className="flex items-center justify-center gap-x-4 mt-10">
          <button className="px-8 py-2 rounded-full border border-white text-lg text-white hover:bg-black hover:text-white hover:border-black transition-all ease-in-out duration-300">
            Plan & Prices
          </button>
          <button className="px-8 py-2 rounded-full border border-white text-lg bg-white text-black hover:bg-black hover:border-black hover:text-white transition-all ease-in-out duration-300">
            Start My Meeting
          </button>
        </div>
      </section>
    </AppLayout>
  );
};

export default Home;
