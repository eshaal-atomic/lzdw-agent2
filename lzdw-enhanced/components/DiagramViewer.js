import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom AWS-styled Node Component
const AWSAccountNode = ({ data }) => {
  const getNodeStyle = (type) => {
    const styles = {
      master: {
        background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE4EC 100%)',
        border: '3px solid #D6336C',
        shadow: '0 8px 24px rgba(214, 51, 108, 0.25)',
      },
      security: {
        background: 'linear-gradient(135deg, #FFF 0%, #F9FAFB 100%)',
        border: '2px solid #10B981',
        shadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
      },
      workload: {
        background: 'linear-gradient(135deg, #FFF 0%, #F9FAFB 100%)',
        border: '2px solid #3B82F6',
        shadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
      },
      networking: {
        background: 'linear-gradient(135deg, #FFF 0%, #F9FAFB 100%)',
        border: '2px solid #8B5CF6',
        shadow: '0 4px 12px rgba(139, 92, 246, 0.2)',
      },
    };
    return styles[type] || styles.workload;
  };

  const style = getNodeStyle(data.type);
  const isMaster = data.type === 'master';

  return (
    <div
      style={{
        padding: isMaster ? '24px' : '16px',
        borderRadius: '12px',
        background: style.background,
        border: style.border,
        boxShadow: style.shadow,
        minWidth: isMaster ? '300px' : '220px',
        transition: 'all 0.3s ease',
      }}
      className="aws-node"
    >
      {/* Header with Icon */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: isMaster ? '12px' : '8px' }}>
        <div
          style={{
            width: isMaster ? '48px' : '32px',
            height: isMaster ? '48px' : '32px',
            borderRadius: '8px',
            background: data.type === 'master' ? '#D6336C' : '#6B7280',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            fontSize: isMaster ? '24px' : '18px',
          }}
        >
          {data.icon || '☁️'}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: isMaster ? '16px' : '13px',
              fontWeight: '700',
              color: data.type === 'master' ? '#D6336C' : '#1F2937',
              marginBottom: '2px',
            }}
          >
            {data.label}
          </div>
          {data.badge && (
            <div
              style={{
                display: 'inline-block',
                padding: '2px 8px',
                background: data.type === 'master' ? '#D6336C' : '#6B7280',
                color: 'white',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: '600',
              }}
            >
              {data.badge}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ fontSize: '11px', color: '#4B5563', lineHeight: '1.5' }}>
        {data.email && (
          <div style={{ marginBottom: '6px', wordBreak: 'break-all' }}>
            <strong>Email:</strong> {data.email}
          </div>
        )}
        {data.purpose && (
          <div style={{ color: '#6B7280', fontStyle: 'italic' }}>
            {data.purpose}
          </div>
        )}
      </div>

      {/* Additional Info */}
      {data.services && (
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '10px', fontWeight: '600', color: '#6B7280', marginBottom: '4px' }}>
            Key Services:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {data.services.slice(0, 3).map((service, i) => (
              <span
                key={i}
                style={{
                  padding: '2px 6px',
                  background: '#F3F4F6',
                  borderRadius: '4px',
                  fontSize: '9px',
                  color: '#4B5563',
                }}
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Custom OU Group Node
const OUGroupNode = ({ data }) => {
  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '16px',
        background: `${data.color}10`,
        border: `2px dashed ${data.color}`,
        minWidth: '240px',
        minHeight: '100px',
      }}
    >
      <div style={{ fontSize: '14px', fontWeight: '700', color: data.color, marginBottom: '8px' }}>
        {data.label}
      </div>
      <div style={{ fontSize: '11px', color: '#6B7280' }}>
        {data.description}
      </div>
    </div>
  );
};

const nodeTypes = {
  awsAccount: AWSAccountNode,
  ouGroup: OUGroupNode,
};

export default function DiagramViewer({ architecture }) {
  // Transform architecture data to React Flow format
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    if (!architecture) return { nodes: [], edges: [] };

    const nodes = [];
    const edges = [];
    let yOffset = 0;
    const VERTICAL_SPACING = 180;
    const HORIZONTAL_SPACING = 280;

    // Master Account (top center)
    const master = architecture.account_structure?.master_account;
    if (master) {
      nodes.push({
        id: 'master',
        type: 'awsAccount',
        position: { x: 600, y: yOffset },
        data: {
          label: master.name || 'Master Account',
          email: master.email,
          purpose: master.purpose,
          type: 'master',
          icon: '👑',
          badge: 'Payer Account',
          services: ['Organizations', 'Control Tower', 'CloudTrail'],
        },
      });
      yOffset += VERTICAL_SPACING;
    }

    // Security OU
    const securityOU = architecture.account_structure?.security_ou || [];
    if (securityOU.length > 0) {
      const ouStartX = 100;
      nodes.push({
        id: 'security-ou-label',
        type: 'ouGroup',
        position: { x: ouStartX - 20, y: yOffset - 20 },
        data: {
          label: '🛡️ Security OU',
          description: `${securityOU.length} accounts`,
          color: '#10B981',
        },
        draggable: false,
      });

      securityOU.forEach((acc, i) => {
        const nodeId = `security-${i}`;
        nodes.push({
          id: nodeId,
          type: 'awsAccount',
          position: { x: ouStartX + (i * HORIZONTAL_SPACING), y: yOffset + 60 },
          data: {
            label: acc.name,
            email: acc.email,
            purpose: acc.purpose,
            type: 'security',
            icon: '🔒',
            services: ['Security Hub', 'GuardDuty', 'Config'],
          },
        });
        edges.push({
          id: `master-to-${nodeId}`,
          source: 'master',
          target: nodeId,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#10B981', strokeWidth: 2 },
        });
      });
      yOffset += VERTICAL_SPACING + 120;
    }

    // Workload OU
    const workloadOU = architecture.account_structure?.workload_ou || [];
    if (workloadOU.length > 0) {
      const ouStartX = 100;
      nodes.push({
        id: 'workload-ou-label',
        type: 'ouGroup',
        position: { x: ouStartX - 20, y: yOffset - 20 },
        data: {
          label: '⚙️ Workload OU',
          description: `${workloadOU.length} accounts`,
          color: '#3B82F6',
        },
        draggable: false,
      });

      workloadOU.forEach((acc, i) => {
        const nodeId = `workload-${i}`;
        nodes.push({
          id: nodeId,
          type: 'awsAccount',
          position: { x: ouStartX + (i * HORIZONTAL_SPACING), y: yOffset + 60 },
          data: {
            label: acc.name,
            email: acc.email,
            purpose: acc.purpose,
            type: 'workload',
            icon: '💼',
            services: ['EC2', 'RDS', 'S3'],
          },
        });
        edges.push({
          id: `master-to-${nodeId}`,
          source: 'master',
          target: nodeId,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#3B82F6', strokeWidth: 2 },
        });
      });
      yOffset += VERTICAL_SPACING + 120;
    }

    // Networking OU
    const networkingOU = architecture.account_structure?.networking_ou || [];
    if (networkingOU.length > 0) {
      const ouStartX = 100;
      nodes.push({
        id: 'networking-ou-label',
        type: 'ouGroup',
        position: { x: ouStartX - 20, y: yOffset - 20 },
        data: {
          label: '🌐 Networking OU',
          description: `${networkingOU.length} accounts`,
          color: '#8B5CF6',
        },
        draggable: false,
      });

      networkingOU.forEach((acc, i) => {
        const nodeId = `networking-${i}`;
        nodes.push({
          id: nodeId,
          type: 'awsAccount',
          position: { x: ouStartX + (i * HORIZONTAL_SPACING), y: yOffset + 60 },
          data: {
            label: acc.name,
            email: acc.email,
            purpose: acc.purpose,
            type: 'networking',
            icon: '🔗',
            services: ['VPC', 'Transit Gateway', 'Direct Connect'],
          },
        });
        edges.push({
          id: `master-to-${nodeId}`,
          source: 'master',
          target: nodeId,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#8B5CF6', strokeWidth: 2 },
        });
      });
    }

    return { nodes, edges };
  }, [architecture]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onDownloadPNG = useCallback(() => {
    // This will be implemented with html-to-image library
    const element = document.querySelector('.react-flow');
    if (element) {
      import('html-to-image').then(({ toPng }) => {
        toPng(element, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
        })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'aws-architecture-diagram.png';
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.error('Failed to export diagram:', err);
          });
      });
    }
  }, []);

  const onDownloadSVG = useCallback(() => {
    const element = document.querySelector('.react-flow');
    if (element) {
      import('html-to-image').then(({ toSvg }) => {
        toSvg(element, {
          quality: 1.0,
          backgroundColor: '#ffffff',
        })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'aws-architecture-diagram.svg';
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.error('Failed to export diagram:', err);
          });
      });
    }
  }, []);

  if (!architecture) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
        <p>No architecture data available</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '700px', border: '2px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        minZoom={0.2}
        maxZoom={1.5}
      >
        <Background color="#E5E7EB" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'awsAccount') {
              return node.data.type === 'master' ? '#D6336C' : '#3B82F6';
            }
            return '#E5E7EB';
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
        <Panel position="top-right">
          <div style={{ background: 'white', padding: '12px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <button
              onClick={onDownloadPNG}
              style={{
                padding: '8px 16px',
                background: '#D6336C',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                marginRight: '8px',
              }}
            >
              📥 Export PNG
            </button>
            <button
              onClick={onDownloadSVG}
              style={{
                padding: '8px 16px',
                background: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              📥 Export SVG
            </button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
