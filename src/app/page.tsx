"use client";

import Image from "next/image";
import { useState } from "react";

type Option = [string, number];
interface Fee {
  time: Option;
  people: number;
  game: number;
  course: Option;
}

type FeeList = Fee[];

export default function Home() {
  const [feeList, setFeeList] = useState<FeeList>([]);
  const [timeIndex, setTimeIndex] = useState(0);
  const [people, setPeople] = useState(1);
  const [game, setGame] = useState(1);
  const [courseIndex, setCourseIndex] = useState(0);

  const time: Option[] = [
    ["10:00 ~ 12:00", 10000],
    ["12:00 ~ 15:00", 15000],
    ["15:00 ~ 이후", 18000],
  ];
  const course: Option[] = [
    ["18홀", 1],
    ["9홀", 0.5],
  ];

  const addFee = () => {
    const fee: Fee = {
      time: time[timeIndex],
      people: people,
      game: game,
      course: course[courseIndex],
    };
    setFeeList([...feeList, fee]);
  };

  const removeFee = (key: number) => {
    setFeeList(feeList.filter((_, index) => index !== key));
  };

  const resetFee = () => {
    setFeeList([]);
  };

  const total = feeList.reduce(
    (acc, cur) => acc + cur.time[1] * cur.people * cur.game * cur.course[1],
    0
  );

  return (
    <main className="flex h-full lg:h-screen flex-col items-center justify-between p-24 gap-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 z-10">
          <Image
            className="invert dark:invert-0"
            src="/bi.png"
            width={200}
            height={100}
            alt="Friends Academy Logo"
          />
        </div>

        <div className="flex gap-4 w-full justify-center">
          <div className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit w-auto rounded-xl border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <h1 className="my-2 px-4">
              {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원
            </h1>
          </div>
          <button className="card" type="button" onClick={() => resetFee()}>
            초기화
          </button>
        </div>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="fixed place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.6rem_#ffffff70] custom-float"
          src="/main-image.png"
          alt="Next.js Logo"
          width={500}
          height={500}
          priority
        />
      </div>

      <div className="flex flex-col gap-4 h-1/2 w-full items-center lg:overflow-y-scroll">
        {feeList.map((value, key) => (
          <div key={key} className="flex gap-4">
            <h2 className="fee">
              시간 : {value.time[0]} / 인원 : {value.people} / 게임 :{" "}
              {value.game} / 코스 : {value.course[0]} / 요금 :{" "}
              {(value.time[1] * value.people * value.game * value.course[1])
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              원
            </h2>
            <button
              className="card"
              type="button"
              onClick={() => removeFee(key)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-full lg:w-fit">
        <div className="mb-20 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-4">
          <div className="card">
            <header className="flex mb-3 align-bottom gap-1">
              <h2 className="text-2xl font-semibold">시간</h2>
              <Image
                className="height-auto"
                src="/time.png"
                width={32}
                height={32}
                alt="Time Icon"
              />
            </header>
            <div className="flex flex-col gap-1">
              {Object.entries(time).map((value, key) => (
                <div
                  key={key}
                  className="flex items-center justify-between hover:text-blue-500 cursor-pointer"
                  onClick={() => setTimeIndex(key)}
                >
                  <label
                    className="cursor-pointer"
                    htmlFor={value[1][0]}
                    id={value[1][0]}
                  >
                    {value[1][0]}
                  </label>
                  <input
                    id={value[0]}
                    className="mr-2 cursor-pointer"
                    type="radio"
                    name={value[1][0]}
                    value={key}
                    checked={timeIndex === key}
                    onClick={() => setTimeIndex(key)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <header className="flex mb-3 align-bottom gap-1">
              <h2 className="text-2xl font-semibold">인원</h2>
              <Image
                className="height-auto"
                src="/golfer.png"
                width={32}
                height={32}
                alt="Golfer Icon"
              />
            </header>
            <input
              className="p-2 rounded-md w-full bg-gray-100/80 dark:bg-neutral-800/30 backdrop:blur-sm text-right
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              border border-gray-300 dark:border-neutral-800/30"
              type="number"
              name="people"
              id="people"
              value={people}
              min={1}
              onChange={(e) => setPeople(parseInt(e.target.value))}
              required
            />
          </div>

          <div className="card">
            <header className="flex mb-3 align-bottom gap-1">
              <h2 className="text-2xl font-semibold">게임</h2>
              <Image
                className="height-auto"
                src="/game.png"
                width={32}
                height={32}
                alt="Game Icon"
              />
            </header>
            <input
              className="p-2 rounded-md w-full bg-gray-100/80 dark:bg-neutral-800/30 backdrop:blur-sm text-right
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              border border-gray-300 dark:border-neutral-800/30"
              type="number"
              name="game"
              id="game"
              value={game}
              min={1}
              onChange={(e) => setGame(parseInt(e.target.value))}
              required
            />
          </div>

          <div className="card">
            <header className="flex mb-3 align-bottom gap-1">
              <h2 className="text-2xl font-semibold">코스</h2>
              <Image
                className="height-auto"
                src="/course.png"
                width={32}
                height={32}
                alt="Course Icon"
              />
            </header>
            <div className="flex flex-col gap-1">
              {Object.entries(course).map((value, key) => (
                <div
                  key={key}
                  className="flex items-center justify-between hover:text-blue-500 cursor-pointer"
                  onClick={() => setCourseIndex(key)}
                >
                  <label
                    className="cursor-pointer"
                    htmlFor={value[1][0]}
                    id={value[1][0]}
                  >
                    {value[1][0]}
                  </label>
                  <input
                    id={value[0]}
                    className="mr-2 cursor-pointer"
                    type="radio"
                    name={value[1][0]}
                    value={key}
                    checked={courseIndex === key}
                    onClick={() => setCourseIndex(key)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <input
          className="mb-72 lg:mb-0 border-none !bg-blue-200 hover:!bg-blue-400 card w-full text-center cursor-pointer dark:hover:!bg-blue-800 dark:!bg-blue-900 font-bold
          "
          type="submit"
          value="등록"
          onClick={addFee}
        />
      </div>
    </main>
  );
}
