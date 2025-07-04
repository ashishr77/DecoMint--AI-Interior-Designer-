// "use client"
// import { UserDetailContext } from '@/app/_context/UserDetailContext';
// import { Button } from '@/components/ui/button';
// import { db } from '@/config/db';
// import { Users } from '@/config/schema';
// import { PayPalButtons } from '@paypal/react-paypal-js';
// import { useRouter } from 'next/navigation';
// import React, { useContext, useState } from 'react'

// function BuyCredits() {
//   const creditsOption = [
//     {
//       credits: 5,
//       amount: 0.99
//     },
//     {
//       credits: 10,
//       amount: 1.99
//     },
//     {
//       credits: 25,
//       amount: 3.99
//     },
//     {
//       credits: 50,
//       amount: 6.99
//     },
//     {
//       credits: 100,
//       amount: 9.99
//     },
//   ]

//   const [selectedOption, setSelectedOption] = useState([]);
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   const router = useRouter();
//   const onPaymentSuccess = async () => {
//     console.log("payment Success...")
//     const result = await db.update(Users).set({ credits: userDetail?.credits + selectedOption?.credits }).returning({ id: Users.id });
//     if (result) {
//       setUserDetail(prev => ({
//         ...prev,
//         credits: userDetail?.credits + selectedOption?.credits
//       }))
//       router.push('/dashboard');
//     }
//   }
//   return (
//     <div>
//       <h2 className='font-bold text-2xl'>Buy More Credits</h2>
//       <p>Unlock endless possibilities – Buy more credits and transform your interior with AI magic! ✨🛋️</p>

//       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10'>
//         {creditsOption.map((item, index) => (
//           <div className={`flex flex-col gap-2 justify-center items-center border shadow-md rounded-lg p-5 hover:shadow-xl transition-transform transform hover:scale-105 ${selectedOption?.credits == item.credits && 'border-primary'}`}>
//             <h2 className='font-bold text-3xl'>{item.credits}</h2>
//             <h2 className='font-medium text-xl'>Credits</h2>
//             <Button className="w-full" onClick={() => setSelectedOption(item)}>Select</Button>
//             <h2 className='font-medium text-primary'>${item.amount}</h2>
//           </div>
//         ))}
//       </div>

//       <div className='mt-20'>
//         {selectedOption?.amount &&
//           <PayPalButtons style={{ layout: "horizontal" }} onApprove={() => onPaymentSuccess()} onCancel={() => console.log("Payment Cancel")} createOrder={(data, actions) => {
//             return actions?.order.create({
//               purchase_units: [
//                 {
//                   amount: {
//                     value: selectedOption?.amount?.toFixed(2),
//                     currency_code: 'USD'
//                   }
//                 }
//               ]
//             })
//           }} />
//         }
//       </div>
//     </div>
//   )
// }

// export default BuyCredits

"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { 
  Coins, 
  Sparkles, 
  Crown, 
  Star, 
  Zap,
  CheckCircle,
  CreditCard,
  Palette,
  Home,
  ArrowRight
} from 'lucide-react'

function BuyCredits() {
  const creditsOption = [
    {
      credits: 5,
      amount: 0.99,
      popular: false,
      icon: <Coins className='w-6 h-6' />,
      gradient: 'from-blue-400 to-cyan-400',
      bgGradient: 'from-blue-50 to-cyan-50',
      darkBgGradient: 'from-blue-900/20 to-cyan-900/20',
      title: 'Starter Pack',
      description: 'Perfect for trying out AI design magic'
    },
    {
      credits: 10,
      amount: 1.99,
      popular: false,
      icon: <Sparkles className='w-6 h-6' />,
      gradient: 'from-purple-400 to-pink-400',
      bgGradient: 'from-purple-50 to-pink-50',
      darkBgGradient: 'from-purple-900/20 to-pink-900/20',
      title: 'Creative Bundle',
      description: 'Great for small room transformations'
    },
    {
      credits: 25,
      amount: 3.99,
      popular: true,
      icon: <Crown className='w-6 h-6' />,
      gradient: 'from-orange-400 to-red-400',
      bgGradient: 'from-orange-50 to-red-50',
      darkBgGradient: 'from-orange-900/20 to-red-900/20',
      title: 'Designer Choice',
      description: 'Most popular for home makeovers'
    },
    {
      credits: 50,
      amount: 6.99,
      popular: false,
      icon: <Star className='w-6 h-6' />,
      gradient: 'from-green-400 to-emerald-400',
      bgGradient: 'from-green-50 to-emerald-50',
      darkBgGradient: 'from-green-900/20 to-emerald-900/20',
      title: 'Professional Pack',
      description: 'Ideal for multiple room designs'
    },
    {
      credits: 100,
      amount: 9.99,
      popular: false,
      icon: <Zap className='w-6 h-6' />,
      gradient: 'from-violet-400 to-purple-400',
      bgGradient: 'from-violet-50 to-purple-50',
      darkBgGradient: 'from-violet-900/20 to-purple-900/20',
      title: 'Ultimate Suite',
      description: 'Complete home transformation package'
    },
  ]

  const [selectedOption, setSelectedOption] = useState([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const router = useRouter();

  const onPaymentSuccess = async () => {
    console.log("payment Success...")
    const result = await db.update(Users).set({ 
      credits: userDetail?.credits + selectedOption?.credits 
    }).returning({ id: Users.id });
    
    if (result) {
      setUserDetail(prev => ({
        ...prev,
        credits: userDetail?.credits + selectedOption?.credits
      }))
      router.push('/dashboard');
    }
  }

  return (
    <div className='min-h-screen  dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden'>
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-4'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent'>
              Unlock Your Dream
            </span>
            <br />
            <span className='text-gray-800 dark:text-white'>Interior Design</span>
          </h1>
          
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Transform your living spaces with AI-powered interior design magic. Each credit unlocks unlimited possibilities for creating stunning, personalized interiors that reflect your unique style.
          </p>
          
          {/* Feature Icons */}
          <div className='flex justify-center gap-8 mt-12'>
            {[
              { icon: <Home className='w-6 h-6' />, label: 'Room Redesign' },
              { icon: <Sparkles className='w-6 h-6' />, label: 'AI Magic' },
              { icon: <Palette className='w-6 h-6' />, label: 'Style Options' },
              { icon: <Zap className='w-6 h-6' />, label: 'Instant Results' }
            ].map((feature, index) => (
              <div key={index} className='flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400'>
                <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg'>
                  {feature.icon}
                </div>
                <span className='text-sm font-medium'>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Options */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12'>
          {creditsOption.map((item, index) => (
            <div 
              key={index} 
              className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                selectedOption?.credits === item.credits 
                  ? 'scale-105 shadow-2xl' 
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setSelectedOption(item)}
            >
              {/* Popular Badge */}
              {item.popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 z-10'>
                  <div className='bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1'>
                    <Crown className='w-3 h-3' />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className={`relative p-6 rounded-3xl border-2 transition-all duration-300 ${
                selectedOption?.credits === item.credits
                  ? `border-transparent bg-gradient-to-br ${item.bgGradient} dark:${item.darkBgGradient} shadow-lg`
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}>
                {/* Selection Indicator */}
                {selectedOption?.credits === item.credits && (
                  <div className='absolute top-4 right-4'>
                    <div className={`w-6 h-6 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      <CheckCircle className='w-4 h-4 text-white' />
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 mx-auto group-hover:shadow-xl transition-all duration-300`}>
                  {item.icon}
                </div>

                {/* Content */}
                <div className='text-center'>
                  <h3 className='font-bold text-lg text-gray-800 dark:text-white mb-1'>
                    {item.title}
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
                    {item.description}
                  </p>
                  
                  {/* Credits Display */}
                  <div className='mb-4'>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                      {item.credits}
                    </div>
                    <div className='text-sm text-gray-600 dark:text-gray-400 font-medium'>
                      Credits
                    </div>
                  </div>

                  {/* Price */}
                  <div className='text-2xl font-bold text-gray-800 dark:text-white mb-4'>
                    ${item.amount}
                  </div>

                  {/* Select Button */}
                  <Button 
                    className={`w-full rounded-full font-medium transition-all duration-300 ${
                      selectedOption?.credits === item.credits
                        ? `bg-gradient-to-r ${item.gradient} hover:shadow-lg text-white shadow-md`
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {selectedOption?.credits === item.credits ? (
                      <>
                        <CheckCircle className='w-4 h-4 mr-2' />
                        Selected
                      </>
                    ) : (
                      <>
                        <ArrowRight className='w-4 h-4 mr-2' />
                        Select
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        {selectedOption?.amount && (
          <div className='max-w-2xl mx-auto'>
            <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700'>
              <div className='text-center mb-8'>
                <div className='inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg mb-4'>
                  <CreditCard className='w-4 h-4' />
                  <span>Secure Payment</span>
                </div>
                
                <h3 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>
                  Complete Your Purchase
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  You're purchasing <span className='font-bold text-blue-600'>{selectedOption.credits} credits</span> for <span className='font-bold text-green-600'>${selectedOption.amount}</span>
                </p>
              </div>

              <div className='bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 mb-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className={`w-12 h-12 bg-gradient-to-br ${selectedOption.gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      {selectedOption.icon}
                    </div>
                    <div>
                      <h4 className='font-bold text-gray-800 dark:text-white'>
                        {selectedOption.title}
                      </h4>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>
                        {selectedOption.credits} Design Credits
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='text-2xl font-bold text-gray-800 dark:text-white'>
                      ${selectedOption.amount}
                    </div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                      One-time payment
                    </div>
                  </div>
                </div>
              </div>

              <PayPalButtons
                style={{
                  layout: 'horizontal',
                  color: 'blue',
                  shape: 'pill',
                  label: 'pay',
                  height: 50
                }}
                onApprove={() => onPaymentSuccess()}
                onCancel={() => console.log("Payment Cancel")}
                createOrder={(data, actions) => {
                  return actions?.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: selectedOption?.amount?.toFixed(2),
                          currency_code: 'USD'
                        }
                      }
                    ]
                  })
                }}
              />
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className='text-center mt-16'>
          <div className='inline-flex items-center gap-6 text-gray-500 dark:text-gray-400'>
            <div className='flex items-center gap-2'>
              <CheckCircle className='w-5 h-5 text-green-500' />
              <span className='text-sm'>Secure Payment</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='w-5 h-5 text-green-500' />
              <span className='text-sm'>Instant Delivery</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle className='w-5 h-5 text-green-500' />
              <span className='text-sm'>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyCredits