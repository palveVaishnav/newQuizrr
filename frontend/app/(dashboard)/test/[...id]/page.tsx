"use client"
// data related to a test 
import { testWithSections } from "@/state/test";
import { useParams } from "next/navigation";
import { useRecoilValueLoadable } from "recoil";
import TestDetails from "@/components/TestDetails";

export default function TestWithSectionsComponent() {
    const { testId } = useParams()
    const testLoadable = useRecoilValueLoadable(testWithSections(testId));
    // need to study lodables 
    switch (testLoadable.state) {
        case "loading":
            return <div>Loading...</div>;
        case "hasError":
            return <div>Error loading test or sections</div>;
        case "hasValue":
            // will resolve this type error later
            return (
                <div>
                    {/* go rid of the type error for now, have handled it in the component */}
                    <TestDetails testId={testLoadable.contents?.id || ""} />
                </div>
            );
        default:
            return null;
    }
};