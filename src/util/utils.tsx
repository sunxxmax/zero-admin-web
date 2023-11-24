export const truncateString = (input: string, maxLength: number): string => {
    return input.length > maxLength ? input.substring(0, maxLength / 2) + '...' + input.substring(input.length - 1 - maxLength / 2, input.length - 1) : input;
}
