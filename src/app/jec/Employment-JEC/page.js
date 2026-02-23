import EmploymentContent from './EmploymentContent';

export const metadata = {
    title: "Careers & Employment at JEC | Jaipur Engineering College",
    description: "Explore career opportunities at Jaipur Engineering College. We invite passionate educators and professionals to join our team and shape the next generation of engineers.",
    keywords: "JEC jobs, teaching jobs Jaipur, engineering college careers Rajasthan, faculty jobs JEC, employment at JEC",
    openGraph: {
        title: "Careers & Employment | Jaipur Engineering College",
        description: "Join the JEC family. Explore teaching and non-teaching career opportunities at one of Rajasthan's top engineering colleges.",
        url: "https://www.jeckukas.org.in/jec/Employment-JEC",
        siteName: "Jaipur Engineering College",
        type: "website",
    },
};

export default function Page() {
    return <EmploymentContent />;
}
