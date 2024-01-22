"use client";

const BouncingBallLoadingIndicator = () => {
    const animations = [
        'cubic-bezier(0.32, 0.04, 0.15, 0.97)',
        'cubic-bezier(0.61, 0.01, 0.88, 0.1)',
        'cubic-bezier(0.22, 0.61, 0.36, 0.88)',
        'cubic-bezier(0.5, 0, 0.5, 1)',
        'cubic-bezier(0.47, 0, 0.745, 0.715)',
        'cubic-bezier(0.39, 0.575, 0.565, 1)'
    ];

    return (
        <div className="w-full h-full flex items-center justify-center"> 
            <div className="bouncer flex items-center justify-between px-3 bg-transparent w-96 h-40">
                {animations.map((animation, index) => (
                    <div
                        key={index}
                        className={`bouncing-ball animate-cubic-bounce bg-slate-300 rounded-full w-10 h-10 transform-gpu`}
                        style={{ animationDelay: `${(index+1)*200}ms` }}
                    />
                ))}
            </div>
        </div>
    );
}

export default BouncingBallLoadingIndicator;
