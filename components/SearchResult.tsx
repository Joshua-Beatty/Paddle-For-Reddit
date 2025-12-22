import { useQuery } from "@tanstack/react-query";
import { FlatList, ScrollView, View } from "react-native";
import client from "@/utils/client";
import { Text } from "./library";

export default function SearchResult({ searchTerm }: { searchTerm: string }) {
    const info = useQuery({
        queryKey: ["search", searchTerm],
        queryFn: async () => {
            return await client.get(`/subreddits/search?q=${searchTerm}`);
        },
    });

    if (info.isLoading) {
        return <Text>Loading</Text>;
    }
    if (info.isError) {
        return <Text>Errored: {JSON.stringify(info.error)}</Text>;
    }
    const data = info.data?.body as SearchResult;
    console.log(JSON.stringify(data));

    return (
        <FlatList
            data={data.data.children.map((x) => x.data)}
            renderItem={({ item }) => (
                <View key={item.id}>
                    <Text>
                        {item.title} - {item.display_name_prefixed}
                    </Text>
                </View>
            )}
            keyExtractor={(x) => x.id}
            style={{ height: "100%" }}
        />
    );
}

interface SearchResult {
    kind: string;
    data: SearchResultData;
}

interface SearchResultData {
    after: string;
    dist: number;
    modhash: any;
    geo_filter: string;
    children: Subreddit[];
    before: any;
}

interface Subreddit {
    kind: "t5";
    data: SubredditData;
}

interface SubredditData {
    user_flair_background_color: any;
    submit_text_html?: string;
    restrict_posting: boolean;
    user_is_banned: boolean;
    free_form_reports: boolean;
    wiki_enabled?: boolean;
    user_is_muted: boolean;
    user_can_flair_in_sr: any;
    display_name: string;
    header_img?: string;
    title: string;
    original_content_tag_enabled: boolean;
    allow_galleries: boolean;
    icon_size?: number[];
    primary_color: string;
    icon_img: string;
    display_name_prefixed: string;
    public_traffic: boolean;
    subscribers: number;
    user_flair_richtext: any[];
    videostream_links_count?: number;
    name: string;
    quarantine: boolean;
    hide_ads: boolean;
    prediction_leaderboard_entry_type: number;
    emojis_enabled: boolean;
    advertiser_category: string;
    public_description: string;
    comment_score_hide_mins: number;
    allow_predictions: boolean;
    user_has_favorited: boolean;
    user_flair_template_id: any;
    community_icon: string;
    banner_background_image: string;
    header_title: string;
    community_reviewed: boolean;
    submit_text: string;
    description_html?: string;
    spoilers_enabled: boolean;
    comment_contribution_settings: CommentContributionSettings;
    allow_talks: boolean;
    header_size?: number[];
    user_flair_position: string;
    all_original_content: boolean;
    has_menu_widget: boolean;
    is_enrolled_in_new_modmail: any;
    key_color: string;
    can_assign_user_flair: boolean;
    created: number;
    wls?: number;
    show_media_preview: boolean;
    submission_type: string;
    user_is_subscriber: boolean;
    allowed_media_in_comments: string[];
    allow_videogifs: boolean;
    should_archive_posts: boolean;
    user_flair_type: string;
    allow_polls: boolean;
    collapse_deleted_comments: boolean;
    emojis_custom_size?: number[];
    public_description_html?: string;
    allow_videos: boolean;
    is_crosspostable_subreddit?: boolean;
    suggested_comment_sort?: string;
    should_show_media_in_comments_setting: boolean;
    can_assign_link_flair: boolean;
    allow_prediction_contributors: boolean;
    submit_text_label: string;
    link_flair_position: string;
    user_sr_flair_enabled: any;
    user_flair_enabled_in_sr: boolean;
    allow_discovery: boolean;
    accept_followers: boolean;
    user_sr_theme_enabled: boolean;
    link_flair_enabled: boolean;
    disable_contributor_requests: boolean;
    subreddit_type: string;
    notification_level?: string;
    banner_img: string;
    user_flair_text: any;
    banner_background_color: string;
    show_media: boolean;
    id: string;
    user_is_contributor: boolean;
    over18: boolean;
    description: string;
    submit_link_label: string;
    user_flair_text_color: any;
    restrict_commenting: boolean;
    user_flair_css_class: any;
    allow_images: boolean;
    lang: string;
    url: string;
    created_utc: number;
    banner_size?: number[];
    mobile_banner_image: string;
    user_is_moderator: boolean;
    allow_predictions_tournament: boolean;
}

interface CommentContributionSettings {
    allowed_media_types?: string[];
}
