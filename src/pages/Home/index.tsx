import AppLayout from 'components/AppLayout';
import BoxReveal from 'components/MagicUI/BoxRevealText';
import AnimatedGridPattern from 'components/MagicUI/RetroGrid';
import { cn } from 'lib/utils';
import React from 'react';
import { Link } from 'react-router-dom';
import colors from 'styles/colors';

const Home = () => {
  return (
    <AppLayout>
      <div className="pt-16 xs:h-[90vh] shadow-xl bg-gradient-to-br from-accent/50 to-primary/80 dark:from-accent/50 dark:to-primary/50 overflow-hidden">
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
      <div className="bg-gray-100 dark:bg-gray-900 xs:px-6 py-10 md:p-10">
        <h2 className="text-center text-xl md:text-3xl font-Manrope font-medium">
          Used by proffessionals on
        </h2>
      </div>
    </AppLayout>
  );
};

export default Home;
