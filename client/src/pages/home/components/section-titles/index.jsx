
const SectionTitles = ({ title }) => {
    return (
        <div className="w-full flex justify-center my-12">
            <div className="w-full max-w-6xl flex justify-center px-4 relative">
                <h1 className="text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent mb-5 animate-fadeIn">
                    {title}
                </h1>
            </div>
        </div>
    )
}

export default SectionTitles
