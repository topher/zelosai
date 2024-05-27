import fs from 'fs';
import path from 'path';

interface Props {
  entityId: string;
  entityType: "BOARD" | "LIST" | "CARD"; // Use string literals matching enum values
  entityTitle: string;
  action: "CREATE" | "UPDATE" | "DELETE"; // Use string literals matching enum values
}

export const CreateAuditLog = async (props: Props) => {
  const { entityId, entityType, entityTitle, action } = props;

  const auditLogEntry = {
    entityId,
    entityType,
    entityTitle,
    action,
    timestamp: new Date().toISOString(),
  };

  const auditLogFilePath = path.join(process.cwd(), 'audit-log.json');

  try {
    let auditLogData = [];
    if (fs.existsSync(auditLogFilePath)) {
      const fileData = fs.readFileSync(auditLogFilePath, 'utf8');
      auditLogData = JSON.parse(fileData);
    }

    auditLogData.push(auditLogEntry);

    fs.writeFileSync(auditLogFilePath, JSON.stringify(auditLogData, null, 2));
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
