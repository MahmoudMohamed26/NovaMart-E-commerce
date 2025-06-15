export default function SpecialHeader(props){
    return(
        <h1 className="relative text-5xl font-bold before:absolute before:bottom-[-20px] before:left-0 before:bg-gray-300 before:w-full w-fit after:absolute after:w-[40%] after:h-[3px] before:h-[1px] after:left-0 after:bottom-[-20px] after:bg-blue-600">{props.header}</h1>
    )
}