import {useState} from 'react'

export interface IPagination {
    page: number
    size: number,
    total: number,
}

const defaultPagination: IPagination = {
    page: 1,
    size: 10,
    total: 0,
}

export function usePagination(initPagination: IPagination = defaultPagination): [
    IPagination,
    (pagination: IPagination) => void
] {
    const [pagination, setPagination] = useState<IPagination>(initPagination)

    return [pagination, setPagination]
}
