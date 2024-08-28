import Spenner from "./Spinner";
import UserLastLogin from "./UserLastLogin";
import { useState, useEffect, useRef } from 'react';

const LogsComponent = ({ logs, onUpdateLog }) => {
    const [visibleLogs, setVisibleLogs] = useState(5);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef(null);

    const loadMoreLogs = () => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setVisibleLogs(prev => Math.min(prev + 4, logs.length));
            setLoading(false);
        }, 1000); // Simulate a loading delay of 1 second
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight && visibleLogs < logs.length) {
            loadMoreLogs();
        }
    };
    

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading]);

    return (
        <div ref={containerRef} className="h-72 overflow-auto">
            {logs.slice(0, visibleLogs).map((log, idx) => (
                <div
                    key={idx}
                    onClick={() => onUpdateLog(log)}
                    className={`${!log?.seen && `border-l-4 border-l-red-400`} rounded-t-lg flex hover:bg-gray-50 cursor-pointer justify-between items-center gap-3 py-4 px-5 border-b text-sm`}>
                    <div className="flex gap-3 relative ">
                        <img
                            alt="Profile"
                            src={log.avatar}
                            className="h-10 w-10 rounded-lg object-cover "
                        />
                        <div>
                            <h2 className="font-semibold">{log.name}</h2>
                            <p title={log.date} className="text-gray-500 text-sm"><UserLastLogin lastLoginTime={log.date} /></p>
                        </div>
                    </div>
                    <div className="text-xs font-light text-right text-gray-500 w-24 ">
                        <h2 className="text-wrap">{log?.deviceInfo?.device}</h2>
                        <h2 className="text-wra">{log?.deviceInfo?.platform}</h2>
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex py-4 justify-center">
                    <Spenner />
                </div>
            )}
        </div>
    );
};

export default LogsComponent;

