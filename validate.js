#!/usr/bin/env node

/**
 * Sentinels Identity — Validation Script
 *
 * Validates all content files against their corresponding JSON schemas.
 * Because identity without integrity is just a costume.
 *
 * Usage: node validate.js
 * Exit code: 0 on success, 1 on failure
 */

import Ajv2020 from "ajv/dist/2020.js";
import yaml from "js-yaml";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Schema-to-directory mapping ──────────────────────────────────────
// Each content directory maps to the schema that validates its files.
const SCHEMA_MAP = [
  {
    directory: "brand",
    schema: "schemas/brand-persona.schema.json",
    extensions: [".yaml", ".yml"],
    label: "Brand Persona",
  },
  {
    directory: "voice",
    schema: "schemas/voice-tone.schema.json",
    extensions: [".yaml", ".yml"],
    label: "Voice & Tone",
  },
  {
    directory: "tokens",
    schema: "schemas/design-tokens.schema.json",
    extensions: [".json"],
    label: "Design Tokens",
  },
  {
    directory: "agents",
    schema: "schemas/agent-identity.schema.json",
    extensions: [".yaml", ".yml"],
    label: "Agent Identity",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────

function loadSchema(schemaPath) {
  const fullPath = join(__dirname, schemaPath);
  if (!existsSync(fullPath)) {
    throw new Error(`Schema not found: ${schemaPath}`);
  }
  return JSON.parse(readFileSync(fullPath, "utf-8"));
}

function loadContentFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  const raw = readFileSync(filePath, "utf-8");

  if (ext === ".json") {
    return JSON.parse(raw);
  }
  if (ext === ".yaml" || ext === ".yml") {
    return yaml.load(raw);
  }
  throw new Error(`Unsupported file extension: ${ext}`);
}

function findContentFiles(directory, extensions) {
  const dirPath = join(__dirname, directory);
  if (!existsSync(dirPath)) {
    return [];
  }

  return readdirSync(dirPath)
    .filter((file) => extensions.includes(extname(file).toLowerCase()))
    .map((file) => join(dirPath, file));
}

function formatErrors(errors) {
  if (!errors) return "";
  return errors
    .map((err) => {
      const path = err.instancePath || "(root)";
      const msg = err.message || "unknown error";
      const params = err.params
        ? ` (${JSON.stringify(err.params)})`
        : "";
      return `    ${path}: ${msg}${params}`;
    })
    .join("\n");
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  console.log("");
  console.log("  ╔══════════════════════════════════════════╗");
  console.log("  ║   Sentinels Identity — Schema Validator  ║");
  console.log("  ║   \"Identity without integrity is just     ║");
  console.log("  ║    a costume.\"                            ║");
  console.log("  ╚══════════════════════════════════════════╝");
  console.log("");

  const ajv = new Ajv2020({ allErrors: true, strict: false });

  let totalFiles = 0;
  let passedFiles = 0;
  let failedFiles = 0;
  const failures = [];

  for (const mapping of SCHEMA_MAP) {
    const schema = loadSchema(mapping.schema);
    const validate = ajv.compile(schema);
    const files = findContentFiles(mapping.directory, mapping.extensions);

    if (files.length === 0) {
      console.log(`  ⚠  ${mapping.label}: No files found in ${mapping.directory}/`);
      continue;
    }

    for (const filePath of files) {
      totalFiles++;
      const fileName = `${mapping.directory}/${basename(filePath)}`;

      try {
        const data = loadContentFile(filePath);
        const valid = validate(data);

        if (valid) {
          passedFiles++;
          console.log(`  ✓  ${fileName}`);
        } else {
          failedFiles++;
          const errorDetail = formatErrors(validate.errors);
          failures.push({ file: fileName, errors: errorDetail });
          console.log(`  ✗  ${fileName}`);
          console.log(errorDetail);
        }
      } catch (parseError) {
        failedFiles++;
        totalFiles++;
        const msg = `    Parse error: ${parseError.message}`;
        failures.push({ file: fileName, errors: msg });
        console.log(`  ✗  ${fileName} (parse error)`);
        console.log(msg);
      }
    }
  }

  // ── Summary ──────────────────────────────────────────────────────
  console.log("");
  console.log("  ──────────────────────────────────────────");
  console.log(`  Total: ${totalFiles}  |  Passed: ${passedFiles}  |  Failed: ${failedFiles}`);
  console.log("  ──────────────────────────────────────────");

  if (failedFiles > 0) {
    console.log("");
    console.log("  ✗ Validation failed. The identity has gaps that need attention.");
    console.log("");
    process.exit(1);
  } else if (totalFiles === 0) {
    console.log("");
    console.log("  ⚠ No content files found. The identity is empty.");
    console.log("");
    process.exit(1);
  } else {
    console.log("");
    console.log("  ✓ All files validated. The identity is coherent.");
    console.log("");
    process.exit(0);
  }
}

main();
