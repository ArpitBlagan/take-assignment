import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  const dd = useRef(null);
  function createStars(type: any, quantity: any) {
    for (let i = 0; i < quantity; i++) {
      var star = document.createElement("div");
      star.classList.add("star", `type-${type}`);
      star.style.left = `${randomNumber(1, 99)}%`;
      star.style.bottom = `${randomNumber(1, 99)}%`;
      star.style.animationDuration = `${randomNumber(50, 200)}s`;
      //@ts-ignore
      dd?.current?.appendChild(star);
    }
  }
  function randomNumber(min: any, max: any) {
    return Math.floor(Math.random() * max) + min;
  }
  useEffect(() => {
    createStars(1, 100);
    createStars(2, 50);
    createStars(3, 30);
  }, []);
  return (
    <div
      ref={dd}
      className=" relative overflow-hidden flex flex-wrap gap-3 items-center  justify-start  mt-4 h-[200px] border rounded-t-xl px-6"
    >
      <div>
        <h1>Made with ❤️ By Arpit Blagan 🇮🇳</h1>
      </div>
      <div>
        <a
          href="https://github.com/ArpitBlagan"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon width={50} height={30} />
        </a>
      </div>
      <div>
        <a
          href="https://www.linkedin.com/in/arpit-blagan-79081b193/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinIcon width={50} height={30} />
        </a>
      </div>
      <div>
        <a href="https://x.com/arpit_blagan" target="_blank" rel="noreferrer">
          <TwitterIcon width={50} height={30} />
        </a>
      </div>
      <div className="flex-1 flex justify-end items-center gap-4">
        <Link to="/" className="font-semibold text-xl">
          <h1 className="text-[30px] section-heading">Take-Assignment</h1>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
