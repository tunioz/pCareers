import svgPaths from "./svg-ejn7nj5enr";
import imgCard2 from "figma:asset/d3115e06001e15b0685c46fcca65addc03c888dd.png";
import imgCard3 from "figma:asset/13900e4ae61f8cf8eb93e47eb929f3df250a0db3.png";
import imgCard4 from "figma:asset/1c8a83a48e1895c7b375714475945db3ffd0057f.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[60px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[60px] text-center w-[853.55px]">
        <p className="leading-[60px]">Graduate Recruitment Bureau</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[768px] relative shrink-0 w-[768px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[56px] justify-center leading-[28px] not-italic relative shrink-0 text-[#6b7280] text-[20px] text-center w-[743.34px]">
        <p className="mb-0">We specialize in various sectors to ensure we find the perfect match for your degree</p>
        <p>and career goals.</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[20px] max-w-[1400px] px-[24px] right-[20px] top-[128px]" data-name="Container">
      <Heading />
      <Container1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-full">
        <p className="leading-[36px]">Physics</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-[#0055d5] content-stretch flex flex-col h-[500px] items-start justify-end left-[160px] min-w-[320px] overflow-clip p-[40px] rounded-[24px] top-0 w-[320px]" data-name="Card 1">
      <Container3 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[36px] not-italic relative shrink-0 text-[30px] text-white w-full">
        <p className="mb-0">Mechanical</p>
        <p>Engineering</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Heading2 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-[#e5e7eb] content-stretch flex flex-col h-[500px] items-start justify-end left-[512px] min-w-[320px] overflow-clip p-[40px] rounded-[24px] top-0" data-name="Card 2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-75%] max-w-none top-0 w-[250%]" src={imgCard2} />
      </div>
      <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" data-name="Gradient" />
      <Container4 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-full">
        <p className="leading-[36px]">Marketing</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Heading3 />
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute bg-[#e5e7eb] content-stretch flex flex-col h-[500px] items-start justify-end left-[864px] min-w-[320px] overflow-clip p-[40px] rounded-[24px] top-0" data-name="Card 3">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-75%] max-w-none top-0 w-[250%]" src={imgCard3} />
      </div>
      <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" data-name="Gradient" />
      <Container5 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-full">
        <p className="leading-[36px]">IT</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Heading4 />
    </div>
  );
}

function Card3() {
  return (
    <div className="absolute bg-[#e5e7eb] content-stretch flex flex-col h-[500px] items-start justify-end left-[1216px] min-w-[320px] overflow-clip p-[40px] rounded-[24px] top-0" data-name="Card 4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-75%] max-w-none top-0 w-[250%]" src={imgCard4} />
      </div>
      <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" data-name="Gradient" />
      <Container6 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[540px] left-0 overflow-clip right-0 top-[332px]" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[16px] relative shrink-0 w-[14px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
        <g id="SVG">
          <path d={svgPaths.p1485da00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#0055d5] relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] h-full items-center pb-[16.5px] pt-[15.5px] px-[40px] relative">
          <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[112.08px]">
            <p className="leading-[24px]">See all sectors</p>
          </div>
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[56px] items-start justify-center left-0 right-0 top-[920px]" data-name="Container">
      <Link />
    </div>
  );
}

export default function SectorCarouselSection() {
  return (
    <div className="bg-white relative size-full" data-name="Sector Carousel Section">
      <Container />
      <Container2 />
      <Container7 />
    </div>
  );
}