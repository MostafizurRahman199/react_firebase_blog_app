import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export default function Banner() {
  const scrollToLatestPosts = () => {
    const element = document.getElementById('latest-posts');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-[600px]  w-full">
      <Carousel className=" h-full">
        <div className="relative h-full w-full">
          <img
            src="banner1.png"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/80">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Welcome to Our Blog
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                Discover insightful articles, expert opinions, and the latest trends. 
                Join our community of readers and writers sharing knowledge and 
                experiences that matter.
              </Typography>
              <div className="flex justify-center gap-2">
                <Button size="lg" color="white" onClick={scrollToLatestPosts} >
                  Latest Posts
                </Button>
                <Button size="lg" color="white" variant="text">
                  Categories
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src="banner3.png"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full items-center bg-black/70">
            <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Featured Articles
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                Explore our carefully curated collection of featured posts. From technology 
                to lifestyle, our expert writers bring you compelling stories and valuable 
                insights every week.
              </Typography>
              <div className="flex gap-2">
                <Button size="lg" color="white">
                 <Link to="/blogs">Read More</Link>
                </Button>
                <Button size="lg" color="white" variant="text">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src="banner5.jpeg"
            alt="image 3"
            className="h-full w-full object-contain"
          />
          <div className="absolute inset-0 grid h-full w-full items-center bg-black/70">
            <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Join Our Community
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                Be part of our growing community of writers and readers. Share your 
                thoughts, engage in discussions, and stay updated with the latest content 
                in your favorite topics.
              </Typography>
              <div className="flex gap-2">
                <Button size="lg" color="white">
                  <Link to="/">Sign Up</Link>
                </Button>
                <Button size="lg" color="white" variant="text">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}