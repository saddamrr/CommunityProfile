export default function ApplicationLogo({ className = "", community }) {
    return (
        <img
            src={
                community?.logo
                    ? `/storage/${community.logo}`
                    : "/storage/community/a.png"
            }
            alt={community?.name || "Artisan Tech House"}
            className={className}
        />
    );
}
