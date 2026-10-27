import { QuestionnaireStep } from "./types";

export default function getGuidance(step: QuestionnaireStep) {
    switch (step) {
        case "category":
            return (
                <div>
                    <h3 className="font-heading text-xl text-text-primary mb-4">Category</h3>
                    <p className="font-body text-text-muted text-sm max-w-prose">There are many different kinds of computers, but the ones we’re looking at right now fall into one of four categories. Desktop, laptop, mini PC, and workstation.</p>
                    <div className="flex flex-col gap-6">
                        <div className="pl-2 ">
                            <h4 className="font-heading text-base text-text-primary mb-4">Laptop</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">A portable, thin computer that has a screen, a keyboard, and a mouse all integrated into one unit. Laptops are best for those who may need to move their computer, or work in various locations from their computer.</p>
                        </div>
                        <div className="pl-2">
                            <h4 className="font-heading text-base text-text-primary mb-4">Desktop</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">A large, about three boxes of cereal lined up depth-wise, computer. They are stationary, require external displays, keyboards, and mice, and have more wires and cables (don’t be worried, there are plenty of guides, videos, and resources for how to plug everything in). Desktop computers are also typically more powerful than laptops, and may last longer due to their easy upgrades and more efficient builds. Recommended for people who need heavier workloads, like playing video games, editing videos, or working for prolonged periods.</p>
                        </div>
                        <div className="pl-2">
                            <h4 className="font-heading text-base text-text-primary mb-4">Mini PC</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">A smaller desktop computer. Like desktops, they still have cables and require external hardware. Typically meant for office or school, as well as any place where a large desktop would be inconvenient, but a laptop would be underpowered, or where a workstation should remain stationary. They typically have lower power than a desktop, but equivalent or higher power than a laptop. Recommended for people who don’t need or want a desktop because of size or power, workplaces that require stationary workstations, or anyone who wants the benefits of a desktop without the bulk.</p>
                        </div>
                        <div className="pl-2">
                            <h4 className="font-heading text-base text-text-primary mb-4">Workstation</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">Large and typically bulky desktop PCs, with higher computer power that draws more electricity. Stationary and require external hardware. Not recommended for most people. Recommended for people that have high computational requirements (like scientific computing or simulations), do complex rendering tasks, or need a generally high-powered computer for commercial use. For most people, a desktop PC will fulfill your needs if you think you’ll need a workstation.</p>
                        </div>
                    </div>
                </div>
            )
        case "budget":
            return (
                <div>
                    <h3 className="font-heading text-xl text-text-primary mb-4">Budget</h3>
                    <p className="font-body text-text-muted text-sm max-w-prose">Move the slider or type in the maximum amount of money you want to spend. P.S. the slider moves by $10 increments.</p>
                </div>
            )
        case "longevity":
            return (
                <div>
                    <h3 className="font-heading text-xl text-text-primary mb-4">Longevity</h3>
                    <p className="font-body text-text-muted text-sm max-w-prose">Click the number of how many years you want your computer to last. If it’s not there, click “Other” and type the number into the box that pops up.</p>
                </div>
            )
        case "os":
            return (
                <div>
                    <h3 className="font-heading text-xl text-text-primary mb-4">Operating System</h3>
                    <p className="font-body text-text-muted text-sm max-w-prose">An operating system, or OS, is the single program that governs your computer. It manages all of your computer’s physical components (storage, CPU, GPU, memory, etc.) and lets apps run on it. There are three major operating systems: Mac, Windows, and Linux. </p>
                    <div className="flex flex-col gap-6">
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">macOS</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">An OS exclusive to Apple computers. It syncs perfectly with other Apple devices, like iPhones and iPads, is very easy to use, and is easy to set up. Recommended for people who like or already have Apple devices and want seamless connection, prefer simpler or easy-to-use computers, or prefer Mac’s extreme efficiency (because it can only run on Apple devices, Apple perfectly optimizes its OS to run very fast and efficiently on its hardware. However, because it can only run on Apple devices, the price of Apple computers is higher than other computers).</p>
                        </div>
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">Windows</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">An operating system built by Microsoft. It runs on most computers (but not Apple computers). It provides much more freedom, as it is not restricted by Apple’s closed ecosystem, and is thus much more customizable. However, it is also slightly harder to customize, because unlike Macs, the customization options aren’t all provided (some have to be installed like apps or using a little bit of coding knowledge - again, not as scary as it seems. Plenty of online resources). Windows syncs more with the Android environment and Microsoft tools like OneDrive and Office 365. Overall, it is much more customizable and much less restricted, at the cost of being slightly less (truly, it’s still pretty simple) user-friendly.</p>
                        </div>
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">Linux</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">An open-source (meaning the code is entirely public) operating system. There are many different versions of Linux, called distributions or “distros” for short, that are all meant for different things. Some are for productivity, some are for gaming, some are for privacy. Most of them are built from the same core components arranged in different ways, but some are made differently. There are very few computers out there that come with Linux pre-installed, which means you’ll have to install it yourself. Depending on the distribution, installation can be as easy as installing Windows (sometimes even easier) to needing to know how computers work at a very low level. There are many online resources to look at for this. Clicking Linux will show only computers that are compatible with Linux, but might not necessarily have it pre-installed.</p>
                        </div>
                    </div>
                    <p className="font-body text-text-muted text-sm max-w-prose">Note: there is a fourth type of OS, ChromeOS, which comes with Chromebook computers. Chromebooks are very basic computers and are not enough to meet the needs of most people, and thus they are not included in this website.</p>
                </div>
            )
        case "tiles":
            return (
                <div>
                    <h3 className="font-heading text-xl text-text-primary mb-4">Tiles</h3>
                    <p className="font-body text-text-muted text-sm max-w-prose">Click on the types of apps you use. If you’re not sure what it is, a quick Google search will tell you. For most people, the app types are going to be in order of most used to least used.</p>
                </div>
            )
        case "gaming_style":
            return (
                <div>
                    <h3 className="font-heading text-xl text-text-primary mb-4">Gaming Style</h3>
                    <p className="font-body text-text-muted text-sm max-w-prose">For video gaming, there are three major types of gaming included in this questionnaire.</p>
                    <div className="flex flex-col gap-6">
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">Regular</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">A casual player who just plays for fun or with friends. Doesn’t particularly have any gaming requirements, just plays video games.</p>
                        </div>
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">Competitive</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">A gamer who plays competitively. Needs a PC that has good WiFi, can handle heavy workloads, and has a high display output. </p>
                        </div>
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">Demanding</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">A gamer who plays demanding games. These games will have high graphic requirements, need a lot of resources, need a high display output, and will take up a lot of space.</p>
                        </div>
                    </div>
                </div>
            )
        case "target_resolution":
            return (
                <div>
                    <h3 className="font-heading text-xl text-text-primary mb-4">Target Resolution</h3>
                    <p className="font-body text-text-muted text-sm max-w-prose">Target monitor resolution is the amount of pixels your monitor will have, and directly correlates with computer specs.</p>
                    <div className="flex flex-col gap-6">
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">4K Ultra HD</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">Very high definition, excellent quality, and will take the most computer resources. Recommended for people who enjoy extreme definition and excellent graphics quality.</p>
                        </div>
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">1440p Quad HD</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">Good definition, good quality, and needs a medium amount of resources. Recommended for those who want good graphics quality, but don’t need 4K.</p>
                        </div>
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">1080p Full HD</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">The standard definition, most commonly used in the computer world. Isn’t as defined as 1440p. Recommended for non-gamers and gamers who play casual games.</p>
                        </div>
                    </div>
                </div>
            )
        case "ai_model_size":
            return (
                <div>
                    <h3 className="font-heading text-xl text-text-primary mb-4">AI Model Size</h3>
                    <p className="font-body text-text-muted text-sm max-w-prose">When running local AI models, model size directly correlates with computer specs.</p>
                    <div className="flex flex-col gap-6">
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">Small</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">7-13B parameters will typically need a small amount of GPU power (8 gigabytes of VRAM).</p>
                        </div>
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">Medium</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">14-34B parameters will typically need a larger amount of GPU power (10-20 gigabytes of VRAM).</p>
                        </div>
                        <div className="pl-2  ">
                            <h4 className="font-heading text-base text-text-primary mb-4">Large</h4>
                            <p className="font-body text-text-muted text-sm max-w-prose">35-70B parameters will typically need a very large amount of GPU power (20 gigabytes of VRAM), but this can vary based on the quantization you’re running it at. </p>
                        </div>
                    </div>
                    <p className="font-body text-text-muted text-sm max-w-prose">For AI model size, it is helpful to do research on what model size you will need and what quantization you will be running it at, among other factors, before buying the hardware to run it.</p>
                </div>
            )
        case null:
            return null
        default:
            const _exhaustiveCheck: never = step
            return null
    }
}