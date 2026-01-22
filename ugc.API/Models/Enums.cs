namespace ugc.API.Models;

public enum UserRole
{
    Creator = 0,
    Business = 1,
    Admin = 2
}

public enum UserStatus
{
    Active = 0,
    Suspended = 1
}

public enum ListingStatus
{
    Draft = 0,
    Active = 1,
    Expired = 2,
    Paused = 3
}

public enum ListingMediaType
{
    External = 0,
    VideoHosted = 1,
    Image = 2
}

public enum Currency
{
    Bgn = 0,
    Eur = 1,
    Usd = 2
}

public enum ReviewStatus
{
    Pending = 0,
    Published = 1,
    Disputed = 2,
    Removed = 3
}

public enum ProjectBriefType
{
    Video = 0,
    Photo = 1,
    Unboxing = 2,
    Influencer = 3,
    Voice = 4,
    Mix = 5
}

public enum ProjectBriefStatus
{
    Open = 0,
    Closed = 1
}

public enum DeliveryPolicy
{
    ShipsProduct = 0,
    Virtual = 1,
    Other = 2
}

public enum BriefApplicationStatus
{
    Sent = 0,
    Shortlisted = 1,
    Rejected = 2,
    Hired = 3
}

public enum SubscriptionStatus
{
    Active = 0,
    Canceled = 1,
    PastDue = 2
}

public enum BillingProvider
{
    Stripe = 0
}

public enum PaymentType
{
    Subscription = 0,
    Boost = 1
}

public enum PaymentStatus
{
    Pending = 0,
    Succeeded = 1,
    Failed = 2
}

public enum ReportStatus
{
    Open = 0,
    Resolved = 1,
    Dismissed = 2
}

public enum ReportedEntity
{
    Listing = 0,
    Profile = 1,
    Review = 2,
    Message = 3
}

public enum BoostKind
{
    Top7 = 0,
    Top14 = 1,
    FeaturedHome = 2
}
