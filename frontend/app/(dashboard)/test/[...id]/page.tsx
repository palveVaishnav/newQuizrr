"use client"
import { Button } from "@/components/ui/button";
// data related to a test 
import { currentTest, testWithSections } from "@/state/test";
import { sectionType } from "@/types/section";
import { useParams, useRouter } from "next/navigation";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";

const TestWithSectionsComponent = () => {
    const { testId } = useParams()
    const testLoadable = useRecoilValueLoadable(testWithSections(testId));
    const setLiveTest = useSetRecoilState(currentTest)
    const router = useRouter()
    switch (testLoadable.state) {
        case "loading":
            return <div>Loading...</div>;
        case "hasError":
            return <div>Error loading test or sections</div>;
        case "hasValue":
            // will resolve this type error later
            const { sections, ...test } = testLoadable.contents;
            return (
                <div>
                    <h1>{test.title}</h1>
                    <ul>
                        {sections.map((section: sectionType) => (
                            <li key={section.id}>{section.title}</li>
                        ))}
                    </ul>
                    <Button onClick={() => {
                        setLiveTest(test)
                        router.push('/livetest')
                    }}>
                        Start Test
                    </Button>
                </div>
            );
        default:
            return null;
    }
};

export default TestWithSectionsComponent;
