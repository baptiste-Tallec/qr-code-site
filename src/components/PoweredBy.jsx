export default function PoweredBy({ hideBranding = false, className = "" }) {
  if (hideBranding) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qrcard.app";

  return (
    <div className={`mt-8 pt-4 border-t border-gray-100 text-center ${className}`}>
      <p className="text-xs text-gray-400">
        Créé avec{" "}
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-gray-500 hover:text-blue-600 transition-colors"
        >
          QR Card
        </a>
      </p>
    </div>
  );
}
