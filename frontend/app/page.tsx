import { Menu } from "@/components/Menu"
import { TextTyping } from "@/components/TextTyping"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative">
      <div className="fixed top-0 z-10 w-full">
        <Menu />
      </div>
      <Herosection />
      <ExamsSupported />
      <ResultsSection />
      <ExamTestSeries />
      <QuerySection />
      <FooterSection />
    </div>
  )
}


function FooterSection() {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="Quizrr Logo"
          width={120}
          height={40}
          className="mb-4 mix-blend-difference"
        />
        <p className="text-gray-600 mb-2">Powered by MathonGo</p>
        <p className="text-gray-500 text-sm mb-2">© Scoremarks Technologies Private Limited</p>
        <Link href="/refund-policy" className="text-blue-600 hover:underline text-sm">
          Refund and Cancellation Policy
        </Link>
      </div>
    </footer>
  )
}


function QuerySection() {
  return (
    <div className="px-60 py-4 flex flex-col md:flex-row items-center justify-between mt-20">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-4xl mb-4">
          Need the <span className="text-blue-600">Most Relevant & Advanced</span> test series for your Institute?
        </h2>
        <p className="text-gray-600 mb-6">
          Now use Quizrr Testing Platform - which is popular among students nationwide for its relevant & comprehensive content along with the{' '}
          <span className="text-blue-600">Most Detailed Analytical Platform</span>.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold flex items-center hover:bg-blue-700 transition duration-300">
          Fill the Inquiry Form
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
      <div className="md:w-1/2">
        <Image
          src="https://www.mathongo.com/public/lk/assets/img/illustrations/illustration-2.png"
          alt="Students collaborating"
          width={400}
          height={300}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}

const examData = [
  { name: 'JEE Main', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/jee-main.png', status: 'October Batch' },
  { name: 'JEE Advanced', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/jee-advanced.png', status: 'Just Launched' },
  { name: 'BITSAT', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/bitsat.png', status: 'Coming Soon' },
  { name: 'UGEE', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/ugee.png', status: 'Coming Soon' },
  { name: 'COMEDK', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/comedk.png', status: 'Coming Soon' },
  { name: 'KCET', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/kcet.png', status: 'Coming Soon' },
  { name: 'AP EAMCET', logo: 'https://cdn-assets.getmarks.app/app_assets/img/exams/ic_content_exam_ap_eamcet.png', status: 'Coming Soon' },
  { name: 'TS EAMCET', logo: 'https://cdn-assets.getmarks.app/app_assets/img/exams/ic_content_exam_ts_eamcet.png', status: 'Coming Soon' },
  { name: 'WBJEE', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/wbjee.png', status: 'Coming Soon' },
  { name: 'MHT CET', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/mht-cet.png', status: 'Coming Soon' },
  { name: 'VITEEE', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/viteee.png', status: 'Coming Soon' },
  { name: 'Manipal (MET)', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/manipal.png', status: 'Coming Soon' },
  { name: 'SRMJEEE', logo: 'https://cdn.quizrr.in/web-assets/icons/exams/srmjeee.png', status: 'Coming Soon' },
]



export function ExamTestSeries() {
  return (
    <div className="container mx-auto px-60 py-8 mt-20" id="packs">
      <div className="text-center text-sm text-red-500 uppercase tracking-wide font-semibold mb-2">
        <span className="border px-2 py-1 bg-red-100 rounded-md">OUR PACKS</span>
      </div>
      <h2 className="text-center text-4xl font-bold mb-8">Our Test Series</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {examData.map((exam, index) => (
          <div key={index} className={`bg-white shadow-xl hover:shadow-xl rounded-sm shadow-[#eff0f1] hover:-translate-y-2 transition-all ease-in-out duration-300 p-4 flex flex-col items-center border-t-2
                        ${exam.status === 'October Batch' ? 'border-red-800' :
              exam.status === 'Just Launched' ? 'border-green-800' :
                'border-gray-800'
            }
                    `}>
            <Image
              src={exam.logo}
              alt={`${exam.name} logo`}
              width={80}
              height={80}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{exam.name}</h3>
            <span className={`text-[12px] px-1 rounded-md ${exam.status === 'October Batch' ? 'bg-red-100 text-red-800' :
              exam.status === 'Just Launched' ? 'bg-green-100 text-green-800' :
                'bg-gray-300 text-gray-800'
              }`}>
              {exam.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}





function ResultsSection() {
  return (
    <div className="mx-auto px-60 mt-20">
      <h1 className="text-4xl md:text-5xl font-bold text-left mb-8">
        Our Result: The Choice of Toppers
      </h1>

      <div className="space-y-8 gap-2">
        <div className="space-y-4 hover:">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
            JEE MAIN 2024
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t-2 border-red-500 hover:-translate-y-2 hover:shadow-xl shadow-gray-500 py-8 transition-all ease-in-out duration-400">
            <div className="text-center">
              <p className="text-4xl font-bold">2017</p>
              <p className="text-gray-600 text-sm">Got 99+ percentile<br />(overall)</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">192</p>
              <p className="text-gray-600 text-sm">Got 100 percentile in<br />one or more subjects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">11</p>
              <p className="text-gray-600 text-sm">Got All India Rank (AIR)<br />under 100</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">98.3%</p>
              <p className="text-gray-600 text-sm">Found the test series<br /><span className="text-red-500 underline">Most Relevant</span></p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            JEE MAIN 2023
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t-2 border-blue-500 hover:-translate-y-2 hover:shadow-xl shadow-gray-500 py-8 transition-all ease-in-out duration-400">
            <div className="text-center">
              <p className="text-4xl font-bold">630</p>
              <p className="text-gray-600 text-sm">Got 99+ percentile<br />(overall)</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">1108</p>
              <p className="text-gray-600 text-sm">Got 99+ percentile in<br />one or more subjects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">85%</p>
              <p className="text-gray-600 text-sm">Improved their score by<br />25 percentile</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">93%</p>
              <p className="text-gray-600 text-sm">Found the test series<br /><span className="text-red-500 underline">Most Relevant</span></p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            JEE MAIN 2022
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t-2 border-blue-500 hover:-translate-y-2 hover:shadow-xl shadow-gray-500 py-8 transition-all ease-in-out duration-400">
            <div className="text-center">
              <p className="text-4xl font-bold">253</p>
              <p className="text-gray-600 text-sm">Got 99+ percentile<br />(overall)</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">508</p>
              <p className="text-gray-600 text-sm">Got 99+ percentile in<br />one or more subjects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">89%</p>
              <p className="text-gray-600 text-sm">Improved their score by<br />25 percentile</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">92.33%</p>
              <p className="text-gray-600 text-sm">Found the test series<br /><span className="text-red-500 underline">Most Relevant</span></p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            JEE MAIN 2021
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t-2 border-blue-500 hover:-translate-y-2 hover:shadow-xl shadow-gray-500 py-8 transition-all ease-in-out duration-400">
            <div className="text-center">
              <p className="text-4xl font-bold">150</p>
              <p className="text-gray-600 text-sm">Got 99+ percentile<br />(overall)</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">301</p>
              <p className="text-gray-600 text-sm">Got 99+ percentile in<br />one or more subjects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">85%</p>
              <p className="text-gray-600 text-sm">Improved their score by<br />25 percentile</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">89%</p>
              <p className="text-gray-600 text-sm">Felt overall confident<br />after the test series</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function ExamsSupported() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-60">
        {examData.map((exam) => (
          <div key={exam.name} className="flex flex-col items-center">
            <Image
              alt="logo"
              src={exam.logo}
              width={50}
              height={50}
              className="mb-2"
            />
            <span className="text-center font-semibold">{exam.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}



function Herosection() {
  return (
    <div className="min-h-[90vh] text-white px-60 border relative">
      <main className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-start">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl">
          {"Prepare with India's Most Trusted Test Series for  "}
        </h1>
        <span className="text-yellow-400 text-left text-4xl">
          <TextTyping />
        </span>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Crack upcoming IIT JEE Main & Advanced and other competitive exams with test series designed according to latest
          pattern of exams!
        </p>
        <a className="text-lg px-6 py-4 rounded-md bg-blue-600 hover:bg-blue-700" href="#packs" >
          Explore Test Series
        </a>
      </main>
      <div
        className="absolute inset-0 -z-10 w-full h-full overflow-hidden"
        style={{
          backgroundImage: `url('https://www.mathongo.com/public/brand/quizrr/assets/home-hero.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent -z-10" />
    </div >
  )
}


