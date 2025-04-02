import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Tree from "react-d3-tree";

const AffiliatePage = () => {
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchGenealogy = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/genealogy/${user?.username}`);
                setTreeData(formatTreeData(response.data));
            } catch (err) {
                setError("Failed to fetch genealogy data");
            } finally {
                setLoading(false);
            }
        };

        fetchGenealogy();
    }, [user?.username]);

    // Convert API response into `react-d3-tree` format
    const formatTreeData = (data) => {
        if (!data?.user) return null;

        const convertToTree = (userNode) => ({
            name: `@${userNode.username}`,
            // name: `${userNode.name} (@${userNode.username})`,
            children: userNode.downline?.map(convertToTree) || [],
        });

        return convertToTree({ ...data.user, downline: data.downline });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!treeData) return <p>No genealogy data available.</p>;

    return (
        <div style={{ width: "100%", height: "80vh" }}>
            <Tree
                data={treeData}
                orientation="vertical"
                translate={{ x: window.innerWidth / 2, y: 100 }}
                pathFunc="step"
                collapsible={true}
                separation={{ siblings: 1.5, nonSiblings: 2.5 }} // Increase spacing
            />
        </div>
    );
};

export default AffiliatePage;
