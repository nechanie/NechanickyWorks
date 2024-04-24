
import GaussImage from "/src/assets/imgs/gauss.jpg";
import CapstoneImage from "/src/assets/imgs/Capstone.jpg";
import DdsImage from "/src/assets/imgs/dds.jpg";
import RequestImage from "/src/assets/imgs/requestform.jpg";
import RecruitmentImage from "/src/assets/imgs/recruitment.jpg";
import MyFridgeImage from "/src/assets/imgs/Myfridge.jpg";
import TMLImage from "/src/assets/imgs/TML.jpg";
const ProjectDataList = ([
    {
        id: 1,
        name: 'Trustworthy Machine Learning',
        description: 'Explore the impact of hyperparameters on AI robustness with our interactive demo. Train neural networks, face adversarial attacks, and discover the balance of AI resilience.',
        image: TMLImage,
        href: "TrustworthyMachineLearning",
        tags: [{
            id: 1, ref: 'ed', text: 'Educational'
        }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
    },
    {
        id: 2,
        name: 'Gaussian Quadrature',
        description: 'Discover the computational power of Gaussian Quadrature which surpasses traditional methods in numerical integration.',
        image: GaussImage,
        href: "GaussianQuadrature",
        tags: [{
            id: 1, ref: 'ed', text: 'Educational'
        }, { id: 2, ref: 'demo', text: 'Interactive Demo' }]
    },
    {
        id: 3,
        name: 'OSU Capstone Project',
        description: 'Experience real-world applications of advanced NLP and vector database technology, and understand how these modern technologies can identify and analyze patterns in vast datasets.',
        image: CapstoneImage,
        href: "OSUCapstoneProject",
        tags: [{
            id: 1, ref: 'ed', text: 'Educational'
        }, { id: 2, ref: 'demo', text: 'Interactive Demo' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
    },
    {
        id: 4,
        name: 'Diffusion Denoised Robustification',
        description: 'Dive into an exploration of cutting-edge diffusion denoising techniques and their effectiveness in improving the securty of constantly evolving deep learning technologies. ',
        image: DdsImage,
        href: "DiffusionDenoisedRobustification",
        tags: [{
            id: 1, ref: 'ed', text: 'Educational'
        }, { id: 2, ref: 'pres', text: 'Presentation' }, { id: 3, ref: 'ml', text: 'Machine Learning' }]
    },
    {
        id: 5,
        name: 'Warehouse Order Form',
        description: 'Explore the real-world application of Blazor Web Forms in an industry setting to bring outdated enterprise applications back to life. ',
        image: RequestImage,
        href: "WarehouseRequestForm",
        tags: [{ id: 1, ref: 'pres', text: 'Presentation' }]
    },
    {
        id: 6,
        name: 'New Hire Requests Form',
        description: 'Explore the real-world application of Blazor Web Forms in an industry setting to streamline hiring processes.',
        image: RecruitmentImage,
        href: "RecruitmentRequestForm",
        tags: [{ id: 1, ref: 'pres', text: 'Presentation' }]
    },
    {
        id: 7,
        name: 'MyFridge Android App',
        description: 'Immerse yourself in a fully functional android application designed to assist with grocery shopping and tracking.',
        image: MyFridgeImage,
        href: "MyFridgeApp",
        tags: [{ id: 1, ref: 'demo', text: 'Interactive Demo' }, { id: 2, ref: 'pres', text: 'Presentation' }]
    },
]);

export default ProjectDataList;