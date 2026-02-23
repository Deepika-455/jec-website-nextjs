import FacultyContent from './FacultyContent';

export const metadata = {
    title: "Faculty & Staff | Jaipur Engineering College",
    description: "Meet the experienced faculty and staff at Jaipur Engineering College (JEC). Our professors bring industry expertise and academic excellence to shape future engineers.",
    keywords: "JEC faculty, engineering professors Jaipur, JEC staff, HOD Jaipur Engineering College",
    openGraph: {
        title: "Faculty & Staff | Jaipur Engineering College",
        description: "Meet the experienced faculty and staff at Jaipur Engineering College (JEC).",
        url: "https://www.jeckukas.org.in/jec/network",
        siteName: "Jaipur Engineering College",
        type: "website",
    },
};

export default function Page() {
    return <FacultyContent />;
}
