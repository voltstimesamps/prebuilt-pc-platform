type GamingSignal = "casual" | "serious" | null
type Weight = 1 | 2 | 3 | 4 | 5
type Category = "everyday" | "creative" | "gaming" | "development" | "aiml" | "professional"


interface Tile {
    id: string;
    label: string;
    category: Category;
    ramWeight: Weight;
    storageWeight: Weight;
    cpuWeight: Weight;
    needsDedicatedGpu: boolean;
    gamingSignal: GamingSignal;
    aiSignal: boolean;
    eccSignal: boolean
}

export const Tiles: Tile[] = [
    {
        id: "web_browsing",
        label: "Web Browsing (Chrome, Firefox)",
        category: "everyday",
        ramWeight: 2,
        storageWeight: 1,
        cpuWeight: 1,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "email",
        label: "Email (Outlook, Gmail)",
        category: "everyday",
        ramWeight: 1,
        storageWeight: 1,
        cpuWeight: 1,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "word_processing",
        label: "Documents & Text Processing (Word, Acrobat)",
        category: "everyday",
        ramWeight: 1,
        storageWeight: 1,
        cpuWeight: 1,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "spreadsheets",
        label: "Spreadsheets (Excel, Sheets)",
        category: "everyday",
        ramWeight: 2,
        storageWeight: 1,
        cpuWeight: 2,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "video_calls",
        label: "Video Calls (Zoom, Teams)",
        category: "everyday",
        ramWeight: 2,
        storageWeight: 1,
        cpuWeight: 2,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "streaming_video",
        label: "Streaming Video (Netflix, YouTube)",
        category: "everyday",
        ramWeight: 1,
        storageWeight: 1,
        cpuWeight: 1,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "note_taking",
        label: "Note-Taking (Notion, Obsidian)",
        category: "everyday",
        ramWeight: 1,
        storageWeight: 1,
        cpuWeight: 1,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "photo_editing",
        label: "Photo Editing (Photoshop, Lightroom)",
        category: "creative",
        ramWeight: 3,
        storageWeight: 3,
        cpuWeight: 3,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "graphic_design",
        label: "Graphic Design (Illustrator, Figma)",
        category: "creative",
        ramWeight: 2,
        storageWeight: 2,
        cpuWeight: 2,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "digital_illustration",
        label: "Digital Illustration (Clip Studio, SketchBook)",
        category: "creative",
        ramWeight: 2,
        storageWeight: 2,
        cpuWeight: 2,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "video_editing",
        label: "Video Editing (Premiere, DaVinci)",
        category: "creative",
        ramWeight: 5,
        storageWeight: 5,
        cpuWeight: 4,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "motion_graphics",
        label: "Motion Graphics & VFX (After Effects)",
        category: "creative",
        ramWeight: 4,
        storageWeight: 4,
        cpuWeight: 4,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "3d_rendering",
        label: "3D Modeling & Rendering (Blender)",
        category: "creative",
        ramWeight: 4,
        storageWeight: 3,
        cpuWeight: 5,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "music_production",
        label: "Music Production (Ableton, FL Studio)",
        category: "creative",
        ramWeight: 3,
        storageWeight: 3,
        cpuWeight: 4,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "audio_editing",
        label: "Podcast & Audio Editing (Audacity)",
        category: "creative",
        ramWeight: 2,
        storageWeight: 2,
        cpuWeight: 2,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "live_streaming",
        label: "Live Streaming (OBS, Streamlabs)",
        category: "creative",
        ramWeight: 3,
        storageWeight: 3,
        cpuWeight: 4,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "casual_gaming",
        label: "Casual Gaming (Stardew Valley, Among Us)",
        category: "gaming",
        ramWeight: 2,
        storageWeight: 2,
        cpuWeight: 2,
        needsDedicatedGpu: false,
        gamingSignal: "casual",
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "aaa_gaming",
        label: "AAA Gaming (Cyberpunk, Elden Ring)",
        category: "gaming",
        ramWeight: 4,
        storageWeight: 4,
        cpuWeight: 4,
        needsDedicatedGpu: true,
        gamingSignal: "serious",
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "competitive_gaming",
        label: "Competitive Gaming & E-Sports (CS2, Valorant)",
        category: "gaming",
        ramWeight: 3,
        storageWeight: 3,
        cpuWeight: 4,
        needsDedicatedGpu: true,
        gamingSignal: "serious",
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "vr_gaming",
        label: "VR Gaming (SteamVR, Meta Link)",
        category: "gaming",
        ramWeight: 4,
        storageWeight: 4,
        cpuWeight: 4,
        needsDedicatedGpu: true,
        gamingSignal: "serious",
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "gaming_emulation",
        label: "Gaming Emulation (RetroArch, RPCS3)",
        category: "gaming",
        ramWeight: 3,
        storageWeight: 4,
        cpuWeight: 4,
        needsDedicatedGpu: true,
        gamingSignal: "serious",
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "web_development",
        label: "Web Development (VS Code, devtools)",
        category: "development",
        ramWeight: 3,
        storageWeight: 2,
        cpuWeight: 3,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "software_development",
        label: "Software & App Development (XCode, Android Studio, Visual Studio)",
        category: "development",
        ramWeight: 3,
        storageWeight: 2,
        cpuWeight: 3,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "data_science",
        label: "Data Science & Analytics (Jupyter, Databricks)",
        category: "development",
        ramWeight: 4,
        storageWeight: 3,
        cpuWeight: 3,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "game_development",
        label: "Game Development (Unity, Unreal)",
        category: "development",
        ramWeight: 4,
        storageWeight: 4,
        cpuWeight: 4,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "containers_vms",
        label: "Containers & VMs (Docker, VirtualBox)",
        category: "development",
        ramWeight: 4,
        storageWeight: 4,
        cpuWeight: 4,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "homelab",
        label: "Homelab & Self-Hosting (Proxmox, TrueNAS)",
        category: "development",
        ramWeight: 5,
        storageWeight: 5,
        cpuWeight: 4,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: true
    },
    {
        id: "local_ai_chat",
        label: "Local AI Chat (Ollama, LM Studio)",
        category: "aiml",
        ramWeight: 4,
        storageWeight: 4,
        cpuWeight: 3,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: true,
        eccSignal: false
    },
    {
        id: "ai_image_gen",
        label: "AI Image Generation (Stable Diffusion, ComfyUI)",
        category: "aiml",
        ramWeight: 4,
        storageWeight: 4,
        cpuWeight: 3,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: true,
        eccSignal: false
    },
    {
        id: "ai_video_gen",
        label: "AI Video Generation (Wan, Mochi)",
        category: "aiml",
        ramWeight: 4,
        storageWeight: 5,
        cpuWeight: 3,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: true,
        eccSignal: false
    },
    {
        id: "ml_training",
        label: "ML Model Training (PyTorch, TensorFlow)",
        category: "aiml",
        ramWeight: 5,
        storageWeight: 5,
        cpuWeight: 5,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: true,
        eccSignal: true
    },
    {
        id: "cad",
        label: "CAD Software (Fusion 360, SolidWorks)",
        category: "professional",
        ramWeight: 4,
        storageWeight: 3,
        cpuWeight: 4,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    },
    {
        id: "engineering_simulation",
        label: "Engineering Simulation (ANSYS, MATLAB)",
        category: "professional",
        ramWeight: 5,
        storageWeight: 4,
        cpuWeight: 5,
        needsDedicatedGpu: true,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: true
    },
    {
        id: "scientific_computing",
        label: "Scientific Research Computing",
        category: "professional",
        ramWeight: 5,
        storageWeight: 4,
        cpuWeight: 5,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: true
    },
    {
        id: "medical_financial_data",
        label: "Medical & Financial Data Processing",
        category: "professional",
        ramWeight: 2,
        storageWeight: 2,
        cpuWeight: 2,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: true
    },
    {
        id: "database_server",
        label: "Database Server (PostgreSQL, MySQL)",
        category: "professional",
        ramWeight: 4,
        storageWeight: 5,
        cpuWeight: 4,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: true
    },
    {
        id: "media_server",
        label: "Media Server (Plex, Jellyfin)",
        category: "professional",
        ramWeight: 2,
        storageWeight: 5,
        cpuWeight: 3,
        needsDedicatedGpu: false,
        gamingSignal: null,
        aiSignal: false,
        eccSignal: false
    }
]