export interface RarityData {
    id: string;
    name: string;
    translationID: string;
    colors: {
        Color1: string;
        Color2: string;
        Color3: string;
        Color4: string;
        Color5: string;
    };
    image: string;
}

export function getRarityByID(id: string): RarityData | undefined {
    return RARITY.find(r => r.id.toLowerCase() === id.toLowerCase());
}

export function getAllRarities(): RarityData[] {
    return RARITY;
}

const RARITY: RarityData[] = [
    {
        id: "Common",
        name: "COMMON",
        translationID: "CommonRarity",
        colors: {
            Color1: "#B1B1B1",
            Color2: "#79858E",
            Color3: "#2D3237",
            Color4: "#0D1013",
            Color5: "#050509",
        },
        image: "https://media.fortniteapi.io/images/rarities/v2/rarity_common.png",
    },
    {
        id: "Uncommon",
        name: "UNCOMMON",
        translationID: "UncommonRarity",
        colors: {
            Color1: "#5BFD00",
            Color2: "#1E8500",
            Color3: "#003700",
            Color4: "#001400",
            Color5: "#000800",
        },
        image: "https://media.fortniteapi.io/images/rarities/v2/rarity_uncommon.png",
    },
    {
        id: "Rare",
        name: "RARE",
        translationID: "RareRarity",
        colors: {
            Color1: "#00FFF6",
            Color2: "#006DFF",
            Color3: "#001985",
            Color4: "#000F41",
            Color5: "#03060A",
        },
        image: "https://media.fortniteapi.io/images/rarities/v2/rarity_rare.png",
    },
    {
        id: "Epic",
        name: "Epic",
        translationID: "Epic",
        colors: {
            Color1: "#D505FF",
            Color2: "#9D19FF",
            Color3: "#2E07A6",
            Color4: "#120233",
            Color5: "#07040A",
        },
        image: "https://media.fortniteapi.io/images/rarities/v2/rarity_epic.png",
    },
    {
        id: "Legendary",
        name: "LEGENDARY",
        translationID: "LegendaryRarity",
        colors: {
            Color1: "#F68B20",
            Color2: "#FF4203",
            Color3: "#851400",
            Color4: "#410B03",
            Color5: "#0A0302",
        },
        image: "https://media.fortniteapi.io/images/rarities/v2/rarity_legendary.png",
    },
    {
        id: "Mythic",
        name: "MYTHIC",
        translationID: "MythicRarity",
        colors: {
            Color1: "#FFDE61",
            Color2: "#C89214",
            Color3: "#854A04",
            Color4: "#331C05",
            Color5: "#0A0603",
        },
        image: "https://media.fortniteapi.io/images/rarities/v2/rarity_mythic.png",
    },
    {
        id: "Transcendent",
        name: "Exotic",
        translationID: "3802651D453178554363A8B5077F4773",
        colors: {
            Color1: "#00B5F6",
            Color2: "#00FF69",
            Color3: "#2E85FF",
            Color4: "#260D41",
            Color5: "#0A040A",
        },
        image: "https://media.fortniteapi.io/images/rarities/v2/rarity_transcendent.png",
    }
];