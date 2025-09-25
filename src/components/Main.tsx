import { useState, useEffect } from "react";
import { useTriviaData } from "../hooks/useTriviaData";
import CategoryChart from "./CategoryChart";
import CategoryFilter from "./CategoryFilter";
import CategoryFilterSkeleton from "./CategoryFilterSkeleton";
import LoadingSpinner from "./LoadingSpinner";
import ErrorPopup from "./ErrorPopup";

export const Main = () => {
    const {
        loading,
        error,
        categories,
        selectedCategory,
        setSelectedCategory,
        categoryDistribution,
        typeDistribution,
        difficultyDistribution,
        retryFetch,
    } = useTriviaData();
    
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    useEffect(() => {
        if (error) {
            setShowErrorPopup(true);
        }
    }, [error]);
    return (
        <div className="pt-10">
            <h1 className="text-4xl font-bold text-center mb-6">Trivia Questions Distribution</h1>
            <div className="flex gap-6 mt-10">
                <div className="flex-shrink-0 w-[400px] h-full">
                    {loading ? (
                        <CategoryFilterSkeleton />
                    ) : (
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    )}
                </div>
                <div className="flex-1">
                    <div className="bg-secondary rounded-2xl py-4 border border-border flex items-stretch">
                        <div className="flex-1">
                            <ChartContainer 
                                heading={selectedCategory ? "Question Types" : "Questions by Category"}
                                distribution={selectedCategory ? typeDistribution : categoryDistribution}
                                loading={loading}
                            />
                        </div>
                        <div className="w-px bg-border self-stretch"></div>
                        <div className="flex-1">
                            <ChartContainer 
                                heading="Questions by Difficulty" 
                                distribution={difficultyDistribution}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {showErrorPopup && (
                <ErrorPopup
                    error={error}
                    onRetry={retryFetch}
                    onClose={() => setShowErrorPopup(false)}
                />
            )}
        </div>
    );
};

const ChartContainer = ({heading, distribution, loading}: {heading: string, distribution: { name: string; value: number }[], loading: boolean}) => {
    return (
        <div className='p-4 flex flex-col gap-4 items-center'>
            <h2 className="text-xl font-semibold mb-2">{heading}</h2>
            {loading ? (
                <div className="flex items-center justify-center h-[350px]">
                    <LoadingSpinner size="lg" />
                </div>
            ) : (
                <CategoryChart data={distribution} />
            )}
        </div>
    )
}