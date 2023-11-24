import {get, post} from "@util/request.tsx";

// 用户接口
export const userPageApi = async (page: number, size: number) => {
    return await get('/user/page', {
        params: {
            page: page,
            size: size
        }
    });
}


export const loginApi = async (username: string, password: string) => {
    return await post(
        '/login',
        {
            username: username,
            password: password
        }
    );
}

export const registerApi = async (username: string, password: string, pwd: string) => {
    return await post(
        '/register',
        {
            username: username,
            password: password,
            pwd: pwd
        }
    );
}

// 平台接口
export const platformPageApi = async (page: number, size?: number) => {
    return await post('/platform/page', {
        page: page,
        size: size
    });
}

export const platformListApi = async () => {
    return await get('/platform/list')
}

export const platformCreateApi = async (name: string) => {
    return await post('/platform/create', {
        name: name,
    });
}

export const platformStatusListApi = async () => {
    return await get('/platform/status/list')
}

// 合作伙伴接口
export const partnerListApi = async () => {
    return await get('/partner/list')
}


export const partnerPageApi = async (page: number, size?: number) => {
    return await get('/partner/page', {
        params: {
            page: page,
            size: size
        }
    });
}

export const partnerCreateApi = async (data: {
    name: string,
    address: string,
    phone: string,

}) => {
    return await post('/partner/create', data);
}

// 接口-订单管理
export const purchasePageApi = async (page: number, size?: number) => {
    return await get('/purchase/page', {
        params: {
            page: page,
            size: size
        }
    });
}

export const purchaseCreateApi = async (data: {
    no: string,
    name: string,
    num: bigint,
    price: number,
    payable: number,
    paid: number,
    buyer: bigint,
    channel: bigint,
    buyAt: string,
    transport: string
}) => {
    return await post('/purchase/create', data);
}

export const purchaseUsableApi = async () => {
    return await get("/purchase/list/usable")
}

// 接口-出售管理
export const salesPageApi = async (page: number, size?: number) => {
    return await get('/sales/page', {
        params: {
            page: page,
            size: size
        }
    });
}

export const salesCreateApi = async (param: {
    stall: string,
    loss: number,
    remark: string,
    items: any[]
}) => {
    return await post('/sales/create', {
        method: param.remark,
        stall: param.stall,
        loss: param.loss,
        items: param.items
    });
}

export const salesDetailApi = async (id: number) => {
    return await get('/sales/detail', {
        params: {id: id}
    })
}

export const salesFinishedApi = async (id: number) => {
    return await post('/sales/finished', null, {params: {id: id}})
}

export const salesPaybackApi = async (id: number, payback: any) => {
    return await post('/sales/payback', {
        id: id,
        payback: payback
    })
}

// 字典管理
export const dictPageApi = async (page: number, size?: number) => {
    return await post('/dict/page', {
        page: page,
        size: size
    });
}

export const dict4TypeApi = async (typeId: number) => {
    return await post('/dict/list/type', {
        typeId: typeId,
    });
}


export const dictTypePageApi = async (page: number, size?: number) => {
    return await post('/dict/type/page', {
        page: page,
        size: size
    });
}







