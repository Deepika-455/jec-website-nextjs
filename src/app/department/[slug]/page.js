import DepartmentContent from './DepartmentContent';

export async function generateMetadata({ params }) {
    const slug = (await params).slug || '';
    // Convert URL slug to readable name: "computer-science-engineering" → "Computer Science Engineering"
    const deptName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return {
        title: `${deptName} Department | Jaipur Engineering College`,
        description: `Explore the ${deptName} department at Jaipur Engineering College (JEC). Learn about our curriculum, faculty, research, labs, and placement records.`,
        keywords: `${deptName} JEC, ${deptName} engineering Jaipur, ${deptName} college Rajasthan, JEC ${deptName} faculty`,
        openGraph: {
            title: `${deptName} Department | Jaipur Engineering College`,
            description: `Explore the ${deptName} department at JEC — top faculty, modern labs, and excellent placement records.`,
            url: `https://www.jeckukas.org.in/department/${slug}`,
            siteName: "Jaipur Engineering College",
            type: "website",
        },
    };
}

export default function Page() {
    return <DepartmentContent />;
}