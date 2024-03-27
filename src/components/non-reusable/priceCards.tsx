'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui-library/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui-library/card';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui-library/button';
import React, { useState } from 'react';
import { cn } from '@/lib/utils/classNames';
import Link from 'next/link';

type PricingSwitchProps = {
  onSwitch: (value: string) => void;
};

type PricingCardProps = {
  isYearly?: boolean;
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
};

const PricingHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <section className='text-center'>
    <h2 className='text-3xl font-bold'>{title}</h2>
    <p className='text-xl pt-1'>{subtitle}</p>
    <br />
  </section>
);

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <Tabs
    defaultValue='0'
    className='w-40 mx-auto'
    onValueChange={onSwitch}
  >
    <TabsList className='py-6 px-2'>
      <TabsTrigger
        value='0'
        className='text-base'
      >
        Månedlig
      </TabsTrigger>
      <TabsTrigger
        value='1'
        className='text-base'
      >
        Årlig
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

const PricingCard = ({
  isYearly,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
}: PricingCardProps) => (
  <Card
    className={cn(
      `w-72 flex flex-col justify-between py-1 ${
        popular ? 'border-rose-400' : 'border-zinc-700'
      } mx-auto sm:mx-0`,
      //   TODO: Make the background shine in white mode when exclusive
      {
        'animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors':
          exclusive,
      }
    )}
  >
    <div>
      <CardHeader className='pb-8 pt-4'>
        {isYearly && yearlyPrice && monthlyPrice ? (
          <div className='flex justify-between'>
            <CardTitle className='text-zinc-700 dark:text-zinc-300 text-lg'>
              {title}
            </CardTitle>
            <div
              className={cn(
                'px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white',
                {
                  'bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ':
                    popular,
                }
              )}
            >
              Spar {monthlyPrice * 12 - yearlyPrice}DKK
            </div>
          </div>
        ) : (
          <CardTitle className='text-zinc-700 dark:text-zinc-300 text-lg'>
            {title}
          </CardTitle>
        )}
        <div className='flex gap-0.5'>
          <h3 className='text-3xl font-bold'>
            {yearlyPrice && isYearly
              ? 'DKK' + yearlyPrice
              : monthlyPrice
              ? 'DKK' + monthlyPrice
              : monthlyPrice === 0 && yearlyPrice === 0
              ? 'Gratis'
              : 'Custom'}
          </h3>
          <span className='flex flex-col justify-end text-sm mb-1'>
            {yearlyPrice && isYearly ? '/år' : monthlyPrice ? '/måned' : null}
          </span>
        </div>
        <CardDescription className='pt-1.5 h-12'>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        {features.map((feature: string) => (
          <CheckItem
            key={feature}
            text={feature}
          />
        ))}
      </CardContent>
    </div>
    <CardFooter className='mt-2'>
      <Link
        href={actionLabel === 'Opret Konto' ? '/register' : '/contact'}
        className='w-full'
      >
        <Button className='relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
          <div className='absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur' />
          {actionLabel}
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

const CheckItem = ({ text }: { text: string }) => (
  <div className='flex gap-2'>
    <CheckCircle2
      size={18}
      className='my-auto text-green-400'
    />
    <p className='pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm'>{text}</p>
  </div>
);

/**
 * @returns HTML for the Pricing Segment
 */
export default function PriceCards() {
  const [isYearly, setIsYearly] = useState(true);
  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);

  const plans = [
    {
      title: 'Gratis',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Essentielle funktioner til at komme i gang',
      features: [
        'Planlæg dit projekt',
        'Tilføj op til 3 brugere',
        'Opret op til 5 projekter',
      ],
      actionLabel: 'Opret Konto',
    },
    {
      title: 'Pro',
      monthlyPrice: 250,
      yearlyPrice: 2500,
      description: 'Perfekt til små teams og freelancere',
      features: [
        'Alt i Gratis',
        'Tilføj op til 10 brugere',
        'Opret op til 20 projekter',
      ],
      actionLabel: 'Opret Konto',
      popular: true,
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      description: 'Perfekt til store teams og virksomheder',
      features: [
        'Alt i Pro',
        'Tilføj uendelige brugere',
        'Opret så mange projekter du ønsker',
        'Dedikeret support',
        'SLA med 99.9% oppetid',
      ],
      actionLabel: 'Kontakt Salg',
      exclusive: true,
    },
  ];
  return (
    <div className='py-10'>
      <PricingSwitch onSwitch={togglePricingPeriod} />
      <section className='flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8'>
        {plans.map((plan) => {
          return (
            <PricingCard
              key={plan.title}
              {...plan}
              isYearly={isYearly}
            />
          );
        })}
      </section>
    </div>
  );
}
