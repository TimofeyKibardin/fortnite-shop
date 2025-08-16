const PAGE_SIZE_NUMS = [8, 12, 24, 48];

export function getPageSize(sizeValue: number): number {
    return PAGE_SIZE_NUMS[sizeValue];
}

export function getAllPageSizes(): number[] {
    return PAGE_SIZE_NUMS;
}