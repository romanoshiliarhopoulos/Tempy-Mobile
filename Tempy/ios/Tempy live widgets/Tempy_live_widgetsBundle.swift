//
//  Tempy_live_widgetsBundle.swift
//  Tempy live widgets
//
//  Created by Romanos Hiliarhopoulos on 4/2/25.
//

import WidgetKit
import SwiftUI

@main
struct Tempy_live_widgetsBundle: WidgetBundle {
    var body: some Widget {
        Tempy_live_widgets()
        Tempy_live_widgetsControl()
        Tempy_live_widgetsLiveActivity()
    }
}
