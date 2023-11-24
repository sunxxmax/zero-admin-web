import {createContext, FC, ReactNode, useContext, useState} from "react";
import {getLocalStorage, setLocalStorage} from "@util/storage.tsx";
import {LOCALE} from "@util/constant.tsx";


type Global = {
    locale: 'zh_CN' | 'en_GB',
    toggleLocale: (locale: 'zh_CN' | 'en_GB') => void
}

const defaultValue: Global = {
    locale: 'zh_CN',
    toggleLocale: () => {
    }
}

// 创建一个Context对象
const AppContext = createContext<Global>(defaultValue);

export const AppProvider: FC<{
    children: ReactNode
}> = ({children}) => {

    let localStore = (getLocalStorage(LOCALE) as 'zh_CN' | 'en_GB') || 'zh_CN';
    const [locale, setLocale] = useState(localStore)

    const toggleLocale = (locale: 'zh_CN' | 'en_GB') => {
        setLocale(locale);
        setLocalStorage(LOCALE, locale)
    };

    return (
        <AppContext.Provider value={{locale, toggleLocale}}>
            {children}
        </AppContext.Provider>
    );
};

// 创建一个自定义的hook来方便在组件中使用Context
export const useAppContext = () => {
    return useContext(AppContext);
};
