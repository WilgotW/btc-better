import React from "react";

export default function About() {
  return (
    <div>
      <div className="flex justify-center p-10">
        <h1 className="text-[40px] tracking-wider">ABOUT</h1>
      </div>
      <div className="flex-col">
        <div className="flex justify-center mb-[80px]">
          <div className="w-[50%]">
            <p className="text-center">
              Welcome to BTC Bet, your ultimate destination for an exhilarating
              and risk-free experience in the world of Bitcoin betting. We've
              created this app with the vision of making Bitcoin more
              accessible, engaging, and enjoyable for users of all backgrounds.
              Whether you're a seasoned cryptocurrency enthusiast or just
              getting started in the world of digital assets, BTC Bet offers an
              exciting platform for you to explore, learn, and profit from
              Bitcoin betting.
            </p>
          </div>
        </div>
        <div className="flex justify-center mb-[80px]">
          <div className="w-[50%]">
            <p className="text-center">
              With BTC Bet, you can place bets and experience the thrill of
              Bitcoin trading without risking your own capital. We offer a
              virtual currency that you can use to make bets, experiment with
              trading strategies, and get a sense of how cryptocurrency markets
              work, all without any financial consequences.
            </p>
          </div>
        </div>
        <div className="flex justify-center mb-[80px]">
          <div className="w-[50%]">
            <p className="text-center">
              Our app is designed as a safe learning environment. Whether you're
              new to cryptocurrency or a seasoned trader, you can test your
              skills and knowledge without fear of losing real money. Learn the
              ropes, develop trading strategies, and hone your instincts to
              become a successful Bitcoin bettor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
