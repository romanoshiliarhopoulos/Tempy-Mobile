//
//  Tempy_live_widgetsLiveActivity.swift
//  Tempy live widgets
//
//  Created by Romanos Hiliarhopoulos on 4/2/25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct Tempy_live_widgetsAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct Tempy_live_widgetsLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: Tempy_live_widgetsAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension Tempy_live_widgetsAttributes {
    fileprivate static var preview: Tempy_live_widgetsAttributes {
        Tempy_live_widgetsAttributes(name: "World")
    }
}

extension Tempy_live_widgetsAttributes.ContentState {
    fileprivate static var smiley: Tempy_live_widgetsAttributes.ContentState {
        Tempy_live_widgetsAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: Tempy_live_widgetsAttributes.ContentState {
         Tempy_live_widgetsAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: Tempy_live_widgetsAttributes.preview) {
   Tempy_live_widgetsLiveActivity()
} contentStates: {
    Tempy_live_widgetsAttributes.ContentState.smiley
    Tempy_live_widgetsAttributes.ContentState.starEyes
}
