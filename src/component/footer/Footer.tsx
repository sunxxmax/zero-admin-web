import {FC} from 'react'
import {IconSemiLogo} from '@douyinfe/semi-icons'
import {Layout} from '@douyinfe/semi-ui'

const Footer: FC = () => {
    return (
        <Layout.Footer
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '20px',
                color: 'var(--semi-color-text-2)',
                backgroundColor: 'rgba(var(--semi-grey-0), 1)'
            }}
        >
				<span
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
					<IconSemiLogo size="large" style={{marginRight: '8px'}}/>
					<span>Copyright ©2021 sunxx. All Rights Reserved. </span>
				</span>
            <span>
					<span style={{marginRight: '24px'}}>官网</span>
					<span>反馈建议</span>
				</span>
        </Layout.Footer>
    )
}

export default Footer
