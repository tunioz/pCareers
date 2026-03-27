import imgTeamMember from "figma:asset/5d342b8828df9edd17c6e44ede6a14c5b1f48cda.png";
import imgTeamMember1 from "figma:asset/57f31c64a82d8961e90e68682ce2cfb361ea63e5.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[72px] w-full">
        <p className="leading-[72px]">Hey there</p>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full" data-name="Heading 2:margin">
      <Heading />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pb-[32px] relative shrink-0 w-[96px]" data-name="Margin">
      <div className="bg-black h-[4px] shrink-0 w-[96px]" data-name="Background" />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[28px] not-italic relative shrink-0 text-[#4b5563] text-[20px] w-full">
        <p className="mb-0">Get to know the faces behind the Graduate</p>
        <p>Recruitment Bureau.</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[40px] relative shrink-0 w-full" data-name="Margin">
      <Container2 />
    </div>
  );
}

function Link() {
  return (
    <div className="bg-[#0055d5] relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div className="content-stretch flex flex-col h-full items-start px-[32px] py-[12px] relative">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[102.28px]">
          <p className="leading-[24px]">Meet the team</p>
        </div>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="content-stretch flex flex-col h-full items-start px-[34px] py-[14px] relative">
        <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#3a3a3a] text-[16px] w-[91.28px]">
          <p className="leading-[24px]">Work with us</p>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[16px] h-[52px] items-start relative shrink-0 w-full" data-name="Container">
      <Link />
      <Link1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative self-stretch shrink-0 w-[486.41px]" data-name="Container">
      <Heading2Margin />
      <Margin />
      <Margin1 />
      <Container3 />
    </div>
  );
}

function TeamMember() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Team Member">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgTeamMember} />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">Dan Hawes</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#bfdbfe] text-[14px] w-full">
        <p className="leading-[20px]">Co-Founder</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="absolute bg-[rgba(30,58,138,0.4)] content-stretch flex flex-col inset-0 items-start justify-end p-[24px]" data-name="Overlay">
      <Heading1 />
      <Container6 />
    </div>
  );
}

function Container5() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-center justify-self-stretch overflow-clip relative rounded-[16px] row-1 self-stretch shrink-0" data-name="Container">
      <TeamMember />
      <Overlay />
    </div>
  );
}

function TeamMember1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Team Member">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgTeamMember1} />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Liberation_Sans:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">Chris Cathcart</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Liberation_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e9d5ff] text-[14px] w-full">
        <p className="leading-[20px]">Co-Founder</p>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="absolute bg-[rgba(88,28,135,0.4)] content-stretch flex flex-col inset-0 items-start justify-end p-[24px]" data-name="Overlay">
      <Heading2 />
      <Container8 />
    </div>
  );
}

function Container7() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch overflow-clip relative rounded-[16px] row-1 self-stretch shrink-0" data-name="Container">
      <TeamMember1 />
      <Overlay1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_356.80px] relative self-stretch shrink-0 w-[729.59px]" data-name="Container">
      <Container5 />
      <Container7 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[64px] h-[280px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container4 />
    </div>
  );
}

export default function HeyThereSection() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[80px] py-[96px] relative size-full" data-name="Hey There Section">
      <Container />
    </div>
  );
}