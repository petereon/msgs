import { useGlobalStore } from '../../stores/global-store';
import ConversationItem from './conversation-item';
import './sidebar.scss';


const Sidebar = () => {
    const conversations = useGlobalStore((state) => state.conversations);
    return (
        <div className='sidebar'>
            {conversations.map((conversation, idx) => {
                return <ConversationItem conversation={conversation} key={idx} />
            })}
        </div>
    )
}

export default Sidebar
