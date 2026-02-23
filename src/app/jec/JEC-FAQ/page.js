import FAQContent from './FAQContent';

export const metadata = {
    title: "Frequently Asked Questions (FAQ) | Jaipur Engineering College",
    description: "Find answers to common questions about admissions, courses, fees, hostel, placements, and more at Jaipur Engineering College (JEC).",
    keywords: "JEC FAQ, engineering college admission queries, JEC hostel fees, JEC courses Rajasthan, engineering college questions",
    openGraph: {
        title: "FAQ | Jaipur Engineering College",
        description: "Find answers to all your questions about JEC — admissions, fees, hostel, placements, and more.",
        url: "https://www.jeckukas.org.in/jec/JEC-FAQ",
        siteName: "Jaipur Engineering College",
        type: "website",
    },
};

export default function Page() {
    return <FAQContent />;
}
