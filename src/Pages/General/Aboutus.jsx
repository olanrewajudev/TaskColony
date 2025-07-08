import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../Components/User/Layout';
import grid from '../../assets/grid.svg';
import img1 from 'assets/brick.png';
import img2 from 'assets/zinc.png';
import { FaUsers, FaStar, FaArrowLeft, FaArrowRight, FaRegUserCircle } from 'react-icons/fa';
import icon1 from '../../assets/icon11.png';
import icon2 from '../../assets/icon12.png';
import icon3 from '../../assets/icon13.png';
import worker from '../../assets/about1.png';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { HomeTestimonials, Team } from '../../utils/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Apis, Posturl } from '../../Components/General/Api';
import { ErrorAlert, ToastAlert } from '../../Components/General/Utils';

const about = [
  { image: icon3, num: '250+', text: 'Authorized Team' },
  { image: icon1, num: '90+', text: 'Service Cites' },
  { image: icon2, num: '1400+', text: 'Happy Customers' },
];

const Aboutus = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handlePrevTestimonial = () => {
    setActiveButton("prev");
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? HomeTestimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNextTestimonial = () => {
    setActiveButton("next");
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === HomeTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const newsletter = async (data) => {
    try {
      const res = await Posturl(Apis.users.news_letter, { email: data.email });
      if (res.data.status === true) {
        ToastAlert(res.data.text);
      } else {
        ErrorAlert(res.text);
      }
    } catch (error) {
      ErrorAlert('An error occurred. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="bg-gray w-full xl:h-[10rem]">
        <div className="text-center py-10 pt-10">
          <p className='font-[500] text-4xl mb-3'>About Us</p>
          <span className='flex items-center gap-4 font-[500] justify-center'>
            <p className="text-primary">Home</p>
            <span className="bg-[#6C757D] w-3 py-0.5"></span>
            <p className="text-secondary">About Us</p>
          </span>
        </div>
      </div>

      <div className="">
        <div className="xl:flex items-start justify-center gap-4 mx-5 mt-20 lg:mx-32">
          <img src={worker} alt="" className="lg:h-[26rem] h-[20rem] object-top object-cover w-full mb-6 lg:mb-0" />
          <div className=" text-lg">
            <p className="mb-4 leading-8 font-medium">Welcome to TaskColony, your trusted partner for on-demand handyman and task services. We connect you with skilled, reliable professionals who are ready to tackle your to-do list—whether it’s fixing, assembling, cleaning, or running errands.          </p>
            <p className="mb-4 leading-8 font-medium">At TaskColony, we believe in simplifying your life by providing a seamless way to find and hire the right experts for your needs. Our vetted taskers are available when and where you need them, ensuring quality, efficiency, and peace of mind.</p>
            <p className="mb-4 leading-8 font-medium">From small repairs to major home projects, we’re here to make your everyday tasks easier, so you can focus on what matters most.</p>
            <p className="mb-4 leading-8 font-medium">Let us help you get things done!</p>
          </div>
        </div>

        <div className="w-11/12 mx-auto lg:w-10/12 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-black rounded-3xl px-5 md:px-10 py-14 text-white">
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-between mt-10">
                <div className="font-medium text-2xl">What our customers say</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-11/12">
                  <div className="font-medium text-xl">{HomeTestimonials[currentTestimonialIndex]?.title}</div>
                  <div className="text-slate-300 w-10/12 ml-4 leading-5 my-5 text-xs">
                    {HomeTestimonials[currentTestimonialIndex]?.content}
                  </div>
                  <div className="md:flex items-center mt-10 justify-between">
                    <div className="flex items-center gap-">
                      <div className="text-4xl"><FaRegUserCircle /></div>
                      <div className="text-sm mx-4">
                        <div className="font-medium">{HomeTestimonials[currentTestimonialIndex]?.name}</div>
                        <div className="flex items-center gap-1 mt-2 text-slate-300 text-xs">
                          {new Array(HomeTestimonials[currentTestimonialIndex]?.rating).fill(0).map((_, i) => (
                            <FaStar key={i} className={`text-secondary`} />
                          ))}
                          | {HomeTestimonials[currentTestimonialIndex]?.date}
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-row mt-3 items-center justify-between gap-3">
                      <button
                        onClick={handlePrevTestimonial}
                        className={`${activeButton === "prev" ? "bg-secondary" : "border border-white"} rounded-full size-10 text-white items-center justify-center flex`}
                      >
                        <FaArrowLeft />
                      </button>
                      <button
                        onClick={handleNextTestimonial}
                        className={`${activeButton === "next" ? "bg-secondary" : "border border-white"} rounded-full size-10 text-white items-center justify-center flex`}
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <LazyLoadImage src={HomeTestimonials[currentTestimonialIndex].img} className="object-cover w-full object-top lg:w-[35rem] lg:h-[20rem]" effect="blur" />
          </div>
        </div>

        <div className="bg-gray xl:w-[80%] w-full h-auto xl:h-[15rem] mb-40 mt-10 xl:py-20 py-10 xl:px-20 mx-auto">
          <div className="flex flex-col xl:flex-row items-center justify-center mx-10 gap-10">
            <div className="text-center xl:text-left">
              <p className="font-[500] text-2xl">Subscribe to our Newsletter</p>
              <p className="text-xs text-primary">Subscribe to the Newsletter to receive exclusive offers, latest news, and updates</p>
            </div>
            <form onSubmit={handleSubmit(newsletter)} className="flex flex-col xl:flex-row items-center w-full xl:w-auto">
              <label className='bg-white gap-[10px] flex items-center h-16 w-[24rem] px-3 border-primary rounded-tl-md rounded-bl-md'>
                <input
                  type="email"
                  placeholder='Enter Your Email Address'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Email is not valid',
                    }
                  })}
                  className='w-full xl:w-[16rem] placeholder:text-xs placeholder:text-primary outline-none'
                />
              </label>
              <button type='submit' className="bg-secondary px-7 text-white flex items-center h-16 w-full xl:w-auto justify-center xl:justify-start rounded-tr-md rounded-br-md mt-3 xl:mt-0">
                Subscribe
              </button>
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Aboutus;