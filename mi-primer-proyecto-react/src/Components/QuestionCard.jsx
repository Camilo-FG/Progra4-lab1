import React from 'react'

const QuestionCard = ({ data, onAnswer, showFeedback, selected, current, total, }) => {
    const { question, options, answer, image } = data;
    const getButtonStyle = (option) => {
        if (!showFeedback) { return "bg-fuchsia-900 hover:bg-fuchsia-800 hover:scale-[1.01]"; }
        if (option === answer) {
            return "bg-green-600";
        }
        if (option === selected) { return "bg-rose-600"; }
        return "bg-gray-600";
    }
    return (

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl border border-gray-100">
            <div className='flex items-center justify-between mb-4 '>
                <h2 className='text-lg font-medium text-gray-300'>
                    Question {current + 1} of {total}
                </h2>
                <span className=' px-3 py-1 rounded-full bg-gray-700'>
                    {selected ? Math.round(((current + 1) / total) * 100) + "% complete"
                        : Math.round((current / total) * 100) + "% complete"
                    }
                </span>
            </div>
            {image && (
                <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                    <img
                        key={current}
                        src={image}
                        alt="question"
                        className={`w-full h-full object-cover transition-transform duration-500
                ${showFeedback ? "scale-100" : "scale-250"}`}
                    />
                </div>
            )}
            <p>{question}</p>
            <div className="grid gap-3  ">
                {options.map((option, index) => (
                    <button className={`${getButtonStyle(option)} text-left px-4 py-3 cursor-pointer rounded-lg `} key={index}
                        onClick={() => onAnswer(option)}
                        disabled={showFeedback}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard
